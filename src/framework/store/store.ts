import { EventBus } from '../eventbus';
import { set } from './set';

export type Indexed = Record<string, unknown>;

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    private state: Record<string, unknown> = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(path, value, this.state);
        this.emit(StoreEvents.Updated);
    }
}

export const store = new Store();
