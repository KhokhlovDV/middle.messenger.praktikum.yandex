import { authApi } from '../api';
import { SignInDto, SignUpDto } from '../api/types';
import { Routes } from '../constants';
import { Router } from '../router';
import { appStore } from '../store';
import { handleError } from './utils';

export class AuthController {
    static async signIn(data: SignInDto) {
        try {
            await authApi.signIn(data);
            await this.getUser();
            Router.getInstance().go(Routes.Messenger);
        } catch (error) {
            handleError(error);
        }
    }

    static async signUp(data: SignUpDto) {
        try {
            await authApi.signUp(data);
            await this.getUser();
            Router.getInstance().go(Routes.Messenger);
        } catch (error) {
            handleError(error);
        }
    }

    static async logout() {
        try {
            await authApi.logout();
        } catch (error) {
            handleError(error);
        }
    }

    static async isUserAuthenticated() {
        if (appStore.getState().user) {
            return true;
        }
        try {
            await this.getUser();
            return true;
        } catch {
            return false;
        }
    }

    private static async getUser() {
        const result = await authApi.getUser();
        appStore.set('user', result);
    }
}
