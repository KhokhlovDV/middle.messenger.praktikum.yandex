import { chatApi } from '../api';
import { CreateChatDto } from '../api/types';
import { BaseController } from './BaseController';

class ChatController extends BaseController {
    async createChat(data: CreateChatDto) {
        try {
            await chatApi.createChat(data);
        } catch (error) {
            this.handleError(error);
        }
    }
}

export const chatController = new ChatController();
