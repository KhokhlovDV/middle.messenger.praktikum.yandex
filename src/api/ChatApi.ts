import { BaseAPI } from './BaseApi';
import {
    ChatDto,
    ChatsDto,
    ChatUsersDto,
    CreateChatDto,
    CreateChatDtoResponse,
    DeleteChatDto,
} from './types';

class ChatApi extends BaseAPI {
    createChat(data: CreateChatDto) {
        return this.httpTransport.post(``, {
            data,
        }) as Promise<CreateChatDtoResponse>;
    }

    getChats() {
        return this.httpTransport.get(``) as Promise<ChatsDto>;
    }

    deleteChat(data: DeleteChatDto) {
        return this.httpTransport.delete('', { data });
    }

    avatar(data: FormData) {
        return this.httpTransport.put(`/avatar`, {
            data,
        }) as Promise<ChatDto>;
    }

    getChatUsers(chatId: number) {
        return this.httpTransport.get(
            `/${chatId}/users`
        ) as Promise<ChatUsersDto>;
    }
}

export const chatApi = new ChatApi('/chats');
