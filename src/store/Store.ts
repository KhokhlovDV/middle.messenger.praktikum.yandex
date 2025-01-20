import { storeWithType } from '../framework';

export interface UserData {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string;
    email: string;
}

export interface ChatData {
    id: number;
    title: string;
    unread_count: number;
    last_message_time: string;
    last_message_content: string;
    avatar: string;
}

type ChatsData = ChatData[];

export interface Message {
    id: number;
    time: string;
    user_id: number;
    content: string;
    path: string;
}

interface ChatMessages {
    id: number;
    messages: Message[];
}

export interface AppStoreType {
    [key: string]: unknown;
    user?: UserData;
    chats: ChatsData;
    currentChat: {
        id?: number;
        users?: string;
    };
    chatsMessages: ChatMessages[];
}

export const appStore = storeWithType<AppStoreType>();
appStore.setInitalState({ chats: [], currentChat: {}, chatsMessages: [] });
