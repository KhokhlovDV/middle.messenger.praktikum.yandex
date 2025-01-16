import { BaseAPI } from './BaseApi';
import { CreateChatDto } from './types';

class ChatApi extends BaseAPI {
    createChat(data: CreateChatDto) {
        return this.httpTransport.post(``, { data });
    }
}

export const chatApi = new ChatApi('/chats');
