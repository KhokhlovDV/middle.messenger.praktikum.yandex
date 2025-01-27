import { Routes } from '../constants';
import { Router } from '../router';
import { appStore } from '../store';
import { HttpError } from '../utils';
import { webSocketController } from './WebSockerController';

export abstract class BaseController {
    protected updateChatInterval?: ReturnType<typeof setInterval>;

    protected handleError(error: unknown) {
        if (error instanceof HttpError) {
            if (error.status >= 500) {
                Router.getInstance().go(Routes.Error);
            } else if (
                error.status === 401 &&
                error.message === 'Cookie is not valid'
            ) {
                this.logoutInternal();
            } else {
                throw new Error(error.message);
            }
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }

    protected logoutInternal() {
        Router.getInstance().go(Routes.Default);
        appStore.setInitalState({
            chats: [],
            currentChat: {},
            chatsMessages: [],
        });
        webSocketController.close();
        clearInterval(this.updateChatInterval);
        this.updateChatInterval = undefined;
    }
}
