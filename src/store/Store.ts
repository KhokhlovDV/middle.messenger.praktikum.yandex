import { storeWithType } from '../framework';

export interface AppStoreType {
    [key: string]: unknown;
    user?: {
        id: number;
        first_name: string;
        second_name: string;
        display_name: string;
        phone: string;
        login: string;
        avatar: string;
        email: string;
    };
}

const initialState: AppStoreType = {};

export const appStore = storeWithType<AppStoreType>();
appStore.setInitalState(initialState);
