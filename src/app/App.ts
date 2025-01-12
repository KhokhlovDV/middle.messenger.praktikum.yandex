import { ChatPage, SignInPage, SignUpPage } from '../pages';
import { Router, Routes } from '../router';

export class App {
    init() {
        const outlet = document.getElementById('app') as HTMLDivElement;
        const router = Router.getInstance();

        router
            .use(Routes.Default, SignInPage)
            .use(Routes.SignUp, SignUpPage)
            .use(Routes.Messenger, ChatPage);

        router.start(outlet);
    }
}
