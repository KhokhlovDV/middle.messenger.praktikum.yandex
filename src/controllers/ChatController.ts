import { chatApi, ChatDto, CreateChatDto, DeleteChatDto } from '../api';
import { appStore, ChatData } from '../store';
import { BaseController } from './BaseController';

class ChatController extends BaseController {
    async createChat(data: CreateChatDto) {
        try {
            const result = await chatApi.createChat(data);
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

    async getChats() {
        try {
            const chats = await this._getChats();
            const stateChats: ChatData[] = chats.map((chat) =>
                this.convertChatDto(chat)
            );
            appStore.set('chats', stateChats);
        } catch (error) {
            this.handleError(error);
        }
    }

    async setCurrentChat(chatId: number) {
        const currentChat = appStore.getState().currentChat.id;
        if (currentChat === chatId) {
            return;
        }
        appStore.set('currentChat', { id: chatId, users: undefined });
        try {
            const result = await chatApi.getChatUsers(chatId);
            const users = result.map((el) => el.login).join(',');
            appStore.set('currentChat', { id: chatId, users: `(${users})` });
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteChat(data: DeleteChatDto) {
        try {
            await chatApi.deleteChat(data);
            appStore.set('currentChat', { id: undefined });
            const stateChats = appStore.getState().chats;
            appStore.set(
                'chats',
                stateChats.filter((chat) => chat.id !== data.chatId)
            );
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

    private async _getChats() {
        const chats = await chatApi.getChats();
        return chats;
    }

    private convertChatDto(chatDto: ChatDto): ChatData {
        return {
            ...chatDto,
            avatar: chatDto.avatar ?? '',
            last_message_time: chatDto.last_message?.time ?? '',
            last_message_content: chatDto.last_message?.content ?? '',
        };
    }
}

export const chatController = new ChatController();
