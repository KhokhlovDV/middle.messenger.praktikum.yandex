import { storeWithType } from '../framework';

export interface AppStoreType {
    [key: string]: unknown;
}

const initialState: AppStoreType = {};

export const appStore = storeWithType<AppStoreType>();
appStore.setInitalState(initialState);
