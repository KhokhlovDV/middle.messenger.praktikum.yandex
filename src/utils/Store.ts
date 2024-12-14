import { mockData } from './mock-data';

export type AppData = typeof mockData;

export class Store {
    private state;

    constructor() {
        this.state = mockData;
    }

    getState() {
        return this.state;
    }
}
