import {
    ChatPage,
    ErrorPage,
    SettigsPage,
    SignInPage,
    SignUpPage,
} from '../pages';
import { Router } from '../router';
import { Routes } from '../constants';
import { authController } from '../controllers';

export class App {
    init() {
        const outlet = document.getElementById('app') as HTMLDivElement;
        const router = Router.getInstance();
        const needAuthRoutes = new Set<string>([
            Routes.Messenger,
            Routes.Settings,
        ]);
        const noAuthRoutes = new Set<string>([Routes.Default, Routes.SignUp]);

        router
            .use(Routes.Error, ErrorPage, {
                errorCode: '500',
                description: 'Мы уже фиксим',
            })
            .use(Routes.Default, SignInPage)
            .use(Routes.SignUp, SignUpPage)
            .use(Routes.Messenger, ChatPage)
            .use(Routes.Settings, SettigsPage)
            .setNotFoundRoute(Routes.NotFound, ErrorPage, {
                errorCode: '404',
                description: 'Не туда попали',
            })
            .setChangeRouteHook(async (pathname) => {
                const isUserAuthenticated =
                    await authController.isUserAuthenticated();
                if (isUserAuthenticated && noAuthRoutes.has(pathname)) {
                    return Routes.Messenger;
                }
                if (!isUserAuthenticated && needAuthRoutes.has(pathname)) {
                    return Routes.Default;
                }
                return pathname;
            })
            .start(outlet);
    }
}
