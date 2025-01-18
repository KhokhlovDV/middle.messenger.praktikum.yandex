import { authApi } from '../api';
import { SignInDto, SignUpDto } from '../api/types';
import { Routes } from '../constants';
import { Router } from '../router';
import { appStore } from '../store';
import { BaseController } from './BaseController';

class AuthController extends BaseController {
    async signIn(data: SignInDto) {
        try {
            await authApi.signIn(data);
            await this.getUser();
            Router.getInstance().go(Routes.Messenger);
        } catch (error) {
            this.handleError(error);
        }
    }

    async signUp(data: SignUpDto) {
        try {
            await authApi.signUp(data);
            await this.getUser();
            Router.getInstance().go(Routes.Messenger);
        } catch (error) {
            this.handleError(error);
        }
    }

    async logout() {
        try {
            await authApi.logout();
            appStore.setInitalState({ chats: [], currentChat: {} });
            Router.getInstance().go(Routes.Default);
        } catch (error) {
            this.handleError(error);
        }
    }

    async isUserAuthenticated() {
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

    private async getUser() {
        const result = await authApi.getUser();
        appStore.set('user', result);
    }
}

export const authController = new AuthController();
