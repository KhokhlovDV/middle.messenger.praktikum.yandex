import { chatApi } from '../api';
import { CreateChatDto } from '../api/types';
import { appStore } from '../store';
import { ChatData } from '../store/Store';
import { BaseController } from './BaseController';

class ChatController extends BaseController {
    async createChat(data: CreateChatDto) {
        try {
            const result = await chatApi.createChat(data);
            const stateChats = appStore.getState().chats;
            const newChat = {
                avatar: '',
                id: result.id,
                last_message_content: '',
                last_message_time: '',
                title: data.title,
                unread_count: 0,
            };
            appStore.set('chats', [newChat, ...stateChats]);
        } catch (error) {
            this.handleError(error);
        }
    }

    async getChats() {
        try {
            const chats = await this._getChats();
            const stateChats: ChatData[] = chats.map((chat) => ({
                ...chat,
                avatar: chat.avatar ?? '',
                last_message_time: chat.last_message?.time ?? '',
                last_message_content: chat.last_message?.content ?? '',
            }));
            appStore.set('chats', stateChats);
        } catch (error) {
            this.handleError(error);
        }
    }

    setCurrentChat(chatId: number) {
        appStore.set('currentChat', { id: chatId });
    }

    private async _getChats() {
        const chats = await chatApi.getChats();
        return chats;
    }
}

export const chatController = new ChatController();
