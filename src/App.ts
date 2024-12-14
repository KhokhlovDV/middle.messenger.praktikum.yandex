import { SignIn } from './pages';
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
                    { path: '/', Component: SignIn },
                    {
                        path: '/server-error',
                        Component: Error,
                        defaultProps: {
                            errorCode: '500',
                            description: 'Мы уже фиксим',
                        },
                    },
                    { path: '/sign-up', Component: SignIn },
                    { path: '/chat', Component: SignIn },
                    { path: '/profile', Component: SignIn },
                    {
                        path: '/change-profile',
                        Component: SignIn,
                    },
                    {
                        path: '/change-password',
                        Component: SignIn,
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
