import { EventBus } from '../eventbus';
import { set } from './set';

export enum StoreEvents {
    Updated = 'updated',
}

class Store<T extends Record<string, unknown>> extends EventBus {
    private state: T;

    public setInitalState(state: T) {
        this.state = state;
    }

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);
    }
}

export const store = new Store();

export const storeWithType = <T extends Record<string, unknown>>(): Store<T> =>
    store as Store<T>;
