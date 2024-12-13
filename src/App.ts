import { SignIn } from './pages';
import { Mediator } from './utils/Mediator';
import { Router } from './utils/Router';
import { Validator } from './utils/Validator';

export class App implements Mediator {
    private router: Router;

    private validator = new Validator();

    constructor() {
        this.router = new Router(
            this,
            document.getElementById('app') as HTMLDivElement,
            {
                routes: [
                    { path: '/', Component: SignIn },
                    {
                        path: '/server-error',
                        Component: SignIn,
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
                NotFoundComponent: SignIn,
            }
        );
    }

    validate(data: FormData): { id: string; errorMessage: string }[] {
        return this.validator.validate(data);
    }

    navigateTo(path: string): void {
        this.router.navigateTo(path);
    }
}
