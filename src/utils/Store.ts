import { mockData } from './mock-data';

export type AppData = typeof mockData;

export interface Chat {
    id: string;
    avatar: string;
    lastMessage: string;
    myMessage: boolean;
    messageTime: string;
    userName: string;
    unreadMessagesCount: number;
}

export interface CurrentChatInfoType {
    avatar: string;
    name: string;
}

export interface ChatMessageType {
    myMessage: boolean;
    messageTime: string;
    messageText: string;
}

export interface ProfileData {
    avatar: string;
    email: string;
    login: string;
    firstName: string;
    secondName: string;
    phone: string;
}

export class Store {
    private state;

    constructor() {
        this.state = mockData;
    }

    getState() {
        return this.state;
    }
}
