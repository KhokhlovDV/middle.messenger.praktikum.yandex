import {
    chatApi,
    ChatDto,
    CreateChatDto,
    DeleteChatDto,
    resourcesApi,
    userApi,
} from '../api';
import { appStore, ChatData } from '../store';
import { helper } from '../utils';
import { BaseController } from './BaseController';
import { webSocketController } from './WebSockerController';

const UPDATE_CHAT_TIMEOUT = 5000;

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

    get() {
        if (this.updateChatInterval) {
            return;
        }
        this._getChats();
        this.updateChatInterval = setInterval(() => {
            this._getChats();
        }, UPDATE_CHAT_TIMEOUT);
    }

    private async _getChats() {
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
        appStore.set(
            'chats',
            appStore
                .getState()
                .chats.map((chat) =>
                    chat.id === chatId ? { ...chat, unread_count: 0 } : chat
                )
        );
        try {
            this.updateCurrentChatUsers(chatId);
            const tokenDto = await this.getToken(chatId);
            const userId = appStore.getState().user!.id;
            webSocketController.connect(chatId, userId, tokenDto.token);
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

    async deleteUser(chatId: number, login: string) {
        try {
            const userId = await this.getUserIdByLogin(login);
            await chatApi.deleteUser({ chatId, users: [userId] });
            this.updateCurrentChatUsers(chatId);
        } catch (error) {
            this.handleError(error);
        }
    }

    async addUser(chatId: number, login: string) {
        try {
            const userId = await this.getUserIdByLogin(login);
            await chatApi.addUser({ chatId, users: [userId] });
            this.updateCurrentChatUsers(chatId);
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

    private async getUserIdByLogin(login: string) {
        const result = await userApi.search({ login });
        if (!result.length) {
            throw new Error('User not found');
        }
        return result[0].id;
    }

    private async getToken(chatId: number) {
        const result = await chatApi.getToken(chatId);
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
        webSocketController.close();
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
