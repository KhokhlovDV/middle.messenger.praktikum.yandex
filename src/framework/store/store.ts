import { EventBus } from '../eventbus';
import { set } from './set';

export enum StoreEvents {
    Updated = 'updated',
}

export interface State {
    [key: string]: unknown;
}

class Store extends EventBus {
    private state: State = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);
    }
}

export const store = new Store();
