import { BaseAPI } from './BaseApi';
import {
    ChatDto,
    ChatsDto,
    ChatUsersDto,
    CreateChatDto,
    CreateChatDtoResponse,
    DeleteChatDto,
    CnahgeChatUsersDto,
    ChatTokenDto,
    UnreadMessagesDto,
} from './types';

class ChatApi extends BaseAPI {
    create(data: CreateChatDto) {
        return this.httpTransport.post(``, {
            data,
        }) as Promise<CreateChatDtoResponse>;
    }

    get() {
        return this.httpTransport.get(``) as Promise<ChatsDto>;
    }

    delete(data: DeleteChatDto) {
        return this.httpTransport.delete('', { data });
    }

    avatar(data: FormData) {
        return this.httpTransport.put(`/avatar`, {
            data,
        }) as Promise<ChatDto>;
    }

    getUsers(chatId: number) {
        return this.httpTransport.get(
            `/${chatId}/users`
        ) as Promise<ChatUsersDto>;
    }

    deleteUsers(data: CnahgeChatUsersDto) {
        return this.httpTransport.delete('/users', { data });
    }

    addUsers(data: CnahgeChatUsersDto) {
        return this.httpTransport.put('/users', { data });
    }

    getToken(chatId: number) {
        return this.httpTransport.post(
            `/token/${chatId}`
        ) as Promise<ChatTokenDto>;
    }
}

export const chatApi = new ChatApi('/chats');
