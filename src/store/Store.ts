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

export interface AppStoreType {
    [key: string]: unknown;
    user?: UserData;
}

const initialState: AppStoreType = {};

export const appStore = storeWithType<AppStoreType>();
appStore.setInitalState(initialState);
