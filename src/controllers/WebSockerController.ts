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

    private unreadMessagesCount: number = 0;

    private oldMessages: OldChatMessagesDto = [];

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
        this.unreadMessagesCount = unreadMessagesCount;
        this.webSocketTransport = new WebSocketTransport(
            `${BASE_URL}/${userId}/${chatId}/${token}`
        );
        this.webSocketTransport.connect().then(() => {
            this.webSocketTransport?.on(
                WebSocketEvents.MESSAGE,
                this.reciveMessage.bind(this) as Callback
            );
            if (unreadMessagesCount) {
                this.fetchOldMessages(0);
            }
        });
    }

    private reciveMessage(data: unknown) {
        if (Array.isArray(data)) {
            this.receiveOldMessages(data as OldChatMessagesDto);
        } else {
            this.receiveMessage(data as ChatMessageDto);
        }
    }

    private fetchOldMessages(from: number) {
        this.send({
            content: from,
            type: 'get old',
        });
    }

    private receiveOldMessages(data: OldChatMessagesDto) {
        const slicedMessages = data.slice(0, this.unreadMessagesCount);
        this.unreadMessagesCount -= slicedMessages.length;
        this.oldMessages = [...this.oldMessages, ...slicedMessages];
        if (this.unreadMessagesCount <= 0) {
            const lastMessage = this.oldMessages[0];
            const messagesToAdd = this.oldMessages;
            this.oldMessages = [];
            this.setChatLastMessage(lastMessage);
            this.setChatMessages(messagesToAdd);
            return;
        }
        const lastMessageId = slicedMessages[slicedMessages.length - 1].id;
        this.fetchOldMessages(lastMessageId);
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
            this.unreadMessagesCount = 0;
            this.webSocketTransport.close();
            this.webSocketTransport.off(
                WebSocketEvents.MESSAGE,
                this.reciveMessage.bind(this) as Callback
            );
            this.webSocketTransport = undefined;
            this.oldMessages = [];
        }
    }
}

export const webSocketController = new WebSocketController();
