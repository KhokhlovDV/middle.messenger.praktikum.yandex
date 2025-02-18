import { Callback } from '../framework/eventbus';
import { appStore, Message } from '../store';
import { helper, WebSocketEvents, WebSocketTransport } from '../utils';

const BASE_URL = 'wss://ya-praktikum.tech/ws/chats';

interface ChatMessageDto {
    id: number;
    time: string;
    user_id: number;
    content: string;
    type: string;
    file?: {
        id: number;
        user_id: number;
        path: string;
        filename: string;
        content_type: string;
        content_size: number;
        upload_date: string;
    };
}

interface OldChatMessageDto extends ChatMessageDto {
    chat_id: number;
}
type OldChatMessagesDto = OldChatMessageDto[];

class WebSocketController {
    private webSocketTransport?: WebSocketTransport;

    send(data: string | number | object) {
        if (this.webSocketTransport) {
            this.webSocketTransport.send(data);
        }
    }

    connect(chatId: number, userId: number, token: string) {
        this.close();
        this.webSocketTransport = new WebSocketTransport(
            `${BASE_URL}/${userId}/${chatId}/${token}`
        );
        this.webSocketTransport.connect().then(() => {
            this.webSocketTransport?.on(
                WebSocketEvents.MESSAGE,
                this.reciveMessage.bind(this) as Callback
            );
            this.fetchOldMessages();
        });
    }

    private reciveMessage(data: unknown) {
        if (Array.isArray(data)) {
            this.receiveOldMessages(data as OldChatMessagesDto);
        } else {
            this.receiveMessage(data as ChatMessageDto);
        }
    }

    private fetchOldMessages() {
        this.send({
            content: '0',
            type: 'get old',
        });
    }

    private receiveOldMessages(data: OldChatMessagesDto) {
        if (data.length > 0) {
            this.setChatLastMessage(data[0]);
            this.setChatMessages([...data]);
        }
    }

    private receiveMessage(data: ChatMessageDto) {
        this.setChatLastMessage(data);
        this.setChatMessages([data]);
    }

    private setChatMessages(data: ChatMessageDto[]) {
        const chatId = appStore.getState().currentChat.id!;
        const convertertedMessages = data.map((message) =>
            this.convertMessage(message)
        );
        const { chatsMessages } = appStore.getState();
        const isChatMessagesExists = chatsMessages.some(
            (el) => el.id === chatId
        );

        const newMessages = isChatMessagesExists
            ? chatsMessages.map((chatMessages) =>
                  chatMessages.id !== chatId
                      ? chatMessages
                      : {
                            ...chatMessages,
                            messages: [
                                ...chatMessages.messages,
                                ...convertertedMessages,
                            ],
                        }
              )
            : [
                  ...chatsMessages,
                  {
                      id: chatId,
                      messages: convertertedMessages,
                  },
              ];
        appStore.set('chatsMessages', newMessages);
    }

    private setChatLastMessage(data: ChatMessageDto) {
        const state = appStore.getState();
        const chatId = state.currentChat.id!;
        const stateChats = state.chats;
        appStore.set(
            'chats',
            stateChats.map((chat) =>
                chat.id === chatId
                    ? {
                          ...chat,
                          last_message_time: helper.converTime(data.time),
                          last_message_content: data.content,
                      }
                    : chat
            )
        );
    }

    private convertMessage(message: ChatMessageDto): Message {
        return {
            content: message.content,
            id: message.id,
            path: message.file?.path ?? '',
            time: helper.converTime(message.time),
            user_id: message.user_id,
        };
    }

    close() {
        if (this.webSocketTransport) {
            this.webSocketTransport.close();
            this.webSocketTransport.off(
                WebSocketEvents.MESSAGE,
                this.reciveMessage.bind(this) as Callback
            );
            this.webSocketTransport = undefined;
        }
    }
}

export const webSocketController = new WebSocketController();
