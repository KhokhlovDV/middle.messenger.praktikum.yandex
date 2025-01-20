import {
    chatApi,
    ChatDto,
    CreateChatDto,
    DeleteChatDto,
    CnahgeChatUsersDto,
    resourcesApi,
} from '../api';
import { appStore, ChatData } from '../store';
import { helper } from '../utils';
import { BaseController } from './BaseController';
import { webSocketController } from './WebSockerController';

class ChatController extends BaseController {
    async create(data: CreateChatDto) {
        try {
            const result = await chatApi.create(data);
            const stateChats = appStore.getState().chats;
            const newChat = {
                id: result.id,
                title: data.title,
                avatar: '',
                last_message_content: '',
                last_message_time: '',
                unread_count: 0,
            };
            appStore.set('chats', [newChat, ...stateChats]);
        } catch (error) {
            this.handleError(error);
        }
    }

    async get() {
        try {
            const chats = await chatApi.get();
            const stateChats: ChatData[] = chats.map((chat) =>
                this.convertChatDto(chat)
            );
            appStore.set('chats', stateChats);
        } catch (error) {
            this.handleError(error);
        }
    }

    async setCurrent(chatId: number) {
        const currentChat = appStore.getState().currentChat.id;
        if (currentChat === chatId) {
            return;
        }
        appStore.set('currentChat', { id: chatId, users: undefined });
        try {
            this.updateCurrentChatUsers(chatId);
            const tokenDto = await this.getToken(chatId);
            const messageCountDto = await this.getUnreadMessageCount(chatId);
            const userId = appStore.getState().user!.id;
            webSocketController.connect(
                chatId,
                userId,
                tokenDto.token,
                messageCountDto.unread_count
            );
        } catch (error) {
            this.handleError(error);
        }
    }

    async delete(data: DeleteChatDto) {
        try {
            await chatApi.delete(data);
            this.deleteChat(data.chatId);
        } catch (error) {
            this.handleError(error);
        }
    }

    async avatar(data: FormData) {
        try {
            const result = await chatApi.avatar(data);
            const stateChats = appStore.getState().chats;
            appStore.set(
                'chats',
                stateChats.map((chat) =>
                    chat.id === result.id ? this.convertChatDto(result) : chat
                )
            );
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteUsers(data: CnahgeChatUsersDto) {
        try {
            await chatApi.deleteUsers(data);
            this.updateCurrentChatUsers(data.chatId);
        } catch (error) {
            this.handleError(error);
        }
    }

    async addUsers(data: CnahgeChatUsersDto) {
        try {
            await chatApi.addUsers(data);
            this.updateCurrentChatUsers(data.chatId);
        } catch (error) {
            this.handleError(error);
        }
    }

    sendMessage(message: string) {
        webSocketController.send({
            type: 'message',
            content: message,
        });
    }

    async sendFile(data: FormData) {
        try {
            const result = await resourcesApi.upload(data);
            webSocketController.send({
                type: 'file',
                content: result.id,
            });
        } catch (error) {
            this.handleError(error);
        }
    }

    private async getToken(chatId: number) {
        const result = await chatApi.getToken(chatId);
        return result;
    }

    private async getUnreadMessageCount(chatId: number) {
        const result = await chatApi.getUnreadMessageCount(chatId);
        return result;
    }

    private async updateCurrentChatUsers(chatId: number) {
        try {
            const result = await chatApi.getUsers(chatId);
            const users = result
                .map((el) => `${el.login}/id:${el.id}`)
                .join(',');
            appStore.set('currentChat', { users: `(${users})` });
        } catch {
            this.deleteChat(chatId);
        }
    }

    private deleteChat(chatId: number) {
        appStore.set('currentChat', { id: undefined });
        const stateChats = appStore.getState().chats;
        appStore.set(
            'chats',
            stateChats.filter((chat) => chat.id !== chatId)
        );
    }

    private convertChatDto(chatDto: ChatDto): ChatData {
        return {
            ...chatDto,
            avatar: chatDto.avatar ?? '',
            last_message_time: chatDto.last_message
                ? helper.converTime(chatDto.last_message.time)
                : '',
            last_message_content: chatDto.last_message?.content ?? '',
        };
    }
}

export const chatController = new ChatController();
