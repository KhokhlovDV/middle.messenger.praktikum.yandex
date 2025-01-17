import { BaseAPI } from './BaseApi';
import { ChatsDto, CreateChatDto, CreateChatDtoResponse } from './types';

class ChatApi extends BaseAPI {
    createChat(data: CreateChatDto) {
        return this.httpTransport.post(``, {
            data,
        }) as Promise<CreateChatDtoResponse>;
    }

    getChats() {
        return this.httpTransport.get(``) as Promise<ChatsDto>;
    }
}

export const chatApi = new ChatApi('/chats');
