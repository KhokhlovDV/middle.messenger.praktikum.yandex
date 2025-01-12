import { authApi } from '../api';
import { SignInDto, SignUpDto } from '../api/types';
import { Router, Routes } from '../router';
import { appStore } from '../store';
import { HttpError } from '../utils/http-transport';

export class AuthController {
    static async signIn(data: SignInDto) {
        // try {
        await authApi.signIn(data);
        await this.getUser();
        Router.getInstance().go(Routes.Messenger);
        // } catch (error) {
        //     if (error instanceof HttpError) {
        //         throw new Error(error.message);
        //     }
        // }
    }

    static async signUp(data: SignUpDto) {
        try {
            await authApi.signUp(data);
            await this.getUser();
            //Router.getInstance().go(Routes.Messenger);
        } catch (error) {
            if (error instanceof HttpError) {
                throw new Error(error.message);
            }
        }
    }

    static async logout() {
        try {
            await authApi.logout();
        } catch (error) {
            if (error instanceof HttpError) {
                throw new Error(error.message);
            }
        }
    }

    static async getUser() {
        const result = await authApi.getUser();
        appStore.set('user', result);
    }
}
