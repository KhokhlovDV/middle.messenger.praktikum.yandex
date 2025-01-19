export interface SignUpDto {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface SignInDto {
    login: string;
    password: string;
}

export interface UserDto {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string;
    email: string;
}

export interface UpdateUserPersonalDataDto {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface UpdateUserPasswordDto {
    oldPassword: string;
    newPassword: string;
}

export interface CreateChatDto {
    title: string;
}

export interface CreateChatDtoResponse {
    id: number;
}

export interface DeleteChatDto {
    chatId: number;
}

export interface ChatDto {
    id: number;
    title: string;
    avatar?: string;
    unread_count: number;
    created_by: number;
    last_message?: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string;
            email: string;
            login: string;
            phone: string;
        };
        time: string;
        content: string;
    };
}

export type ChatsDto = ChatDto[];

interface ChatUserDto {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    avatar: string;
    role: string;
}

export type ChatUsersDto = ChatUserDto[];

export interface CnahgeChatUsersDto {
    users: number[];
    chatId: number;
}

export interface ChatTokenDto {
    token: string;
}

export interface UnreadMessagesDto {
    token: string;
}
