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

interface ChatData {
    id: number;
    title: string;
    unread_count: number;
    last_message: {
        time: string;
        content: string;
    };
}

export type ChatsData = ChatData[];

export interface AppStoreType {
    [key: string]: unknown;
    user?: UserData;
    chats: ChatsData;
}

const initialState: AppStoreType = {
    chats: [],
};

export const appStore = storeWithType<AppStoreType>();
appStore.setInitalState(initialState);
