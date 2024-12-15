import {
    ChatPage,
    ProfileInfoPage,
    ProfilePasswordPage,
    ProfilePersonalDataPage,
    SignInPage,
    SignUpPage,
} from './pages';
import { Error } from './pages/error/Error';
import { Mediator } from './utils/Mediator';
import { Router } from './utils/Router';
import { Store } from './utils/Store';
import { Validator } from './utils/Validator';

export class App implements Mediator {
    private router: Router;

    private validator = new Validator();

    private store = new Store();

    constructor() {
        this.router = new Router(
            this,
            document.getElementById('app') as HTMLDivElement,
            {
                routes: [
                    { path: '/', Component: SignInPage },
                    {
                        path: '/server-error',
                        Component: Error,
                        defaultProps: {
                            errorCode: '500',
                            description: 'Мы уже фиксим',
                        },
                    },
                    { path: '/sign-up', Component: SignUpPage },
                    { path: '/chat', Component: ChatPage },
                    { path: '/profile-info', Component: ProfileInfoPage },
                    {
                        path: '/change-profile',
                        Component: ProfilePersonalDataPage,
                    },
                    {
                        path: '/change-password',
                        Component: ProfilePasswordPage,
                    },
                ],
                notFoundRoute: {
                    Component: Error,
                    defaultProps: {
                        errorCode: '404',
                        description: 'Не туда попали',
                    },
                },
            }
        );
    }

    init() {
        this.router.init();
    }

    getAppData() {
        return this.store.getState();
    }

    validate(data: FormData): { id: string; errorMessage: string }[] {
        return this.validator.validate(data);
    }

    navigateTo(path: string): void {
        this.router.navigateTo(path);
    }
}
