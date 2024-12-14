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

export class Store {
    private state;

    constructor() {
        this.state = mockData;
    }

    getState() {
        return this.state;
    }
}
