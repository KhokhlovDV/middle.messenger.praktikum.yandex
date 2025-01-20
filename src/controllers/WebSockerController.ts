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

type ChatMessagesDto = ChatMessageDto[];
class WebSocketController {
    private webSocketTransport?: WebSocketTransport;

    send(data: string | number | object) {
        if (this.webSocketTransport) {
            this.webSocketTransport.send(data);
        }
    }

    connect(
        chatId: number,
        userId: number,
        token: string,
        unreadMessagesCount: number
    ) {
        this.close();
        this.webSocketTransport = new WebSocketTransport(
            `${BASE_URL}/${userId}/${chatId}/${token}`
        );
        this.webSocketTransport.connect().then(() => {
            this.webSocketTransport?.on(
                WebSocketEvents.MESSAGE,
                this.reciveMessage.bind(this) as Callback
            );
            if (unreadMessagesCount) {
                this.fetchOldMessages(unreadMessagesCount);
            }
        });
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

    private reciveMessage(data: unknown) {
        if (Array.isArray(data)) {
            this.receiveOldMessages(data as ChatMessagesDto);
        } else {
            this.receiveMessage(data as ChatMessageDto);
        }
    }

    private fetchOldMessages(unreadMessagesCount: number) {}

    private receiveOldMessages(data: ChatMessagesDto) {
        console.log('receiveOldMessages');
        console.log({ data });
    }

    private receiveMessage(data: ChatMessageDto) {
        const state = appStore.getState();
        const chatId = state.currentChat.id;
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
        const convertertedMessage = this.convertMessage(data);

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
                                convertertedMessage,
                            ],
                        }
              )
            : [
                  ...chatsMessages,
                  {
                      id: chatId,
                      messages: [convertertedMessage],
                  },
              ];
        appStore.set('chatsMessages', newMessages);
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
}

export const webSocketController = new WebSocketController();
