import { SignInPage, SignUpPage } from '../pages';
import { Router } from '../router';

export class App {
    init() {
        const outlet = document.getElementById('app') as HTMLDivElement;
        const router = Router.getInstance();

        router.use('/', SignInPage).use('/sign-up', SignUpPage);

        router.start(outlet);
    }
}
