import Handlebars from 'handlebars';
import { Button } from './components/button';
import * as Pages from './pages';
import { Router } from './Router';
import { FormField } from './components/form-field';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('FormField', FormField);

export class App {
    private appElement: HTMLDivElement;
    private router: Router;
    constructor() {
        this.appElement = document.getElementById('app') as HTMLDivElement;
        this.router = new Router(
            [
                { path: '/not-found', onRouteMatch: this.renderNotFound },
                { path: '/server-error', onRouteMatch: this.renderServerError },
                { path: '/', onRouteMatch: this.renderSignIn },
                { path: '/sign-up', onRouteMatch: this.renderSignUp },
                { path: '/chat', onRouteMatch: this.renderChat },
            ],
            '/not-found'
        );
    }

    renderNotFound = () => {
        this.renderErrorPage({
            errorCode: '404',
            description: 'Не туда попали',
        });
    };

    renderServerError = () => {
        this.renderErrorPage({
            errorCode: '500',
            description: 'Мы уже фиксим',
        });
    };

    renderSignIn = () => {
        const template = Handlebars.compile(Pages.SignIn);
        this.appElement.innerHTML = template({
            login: 'ivanivanov',
            password: 'mypassword',
        });
        document.getElementById('sign-in')?.addEventListener('click', () => {
            this.router.navigate('/chat');
        });
        document
            .getElementById('registration')
            ?.addEventListener('click', () => {
                this.router.navigate('/sign-up');
            });
    };

    renderSignUp = () => {
        const template = Handlebars.compile(Pages.SignUp);
        this.appElement.innerHTML = template({
            email: 'pochta@yandex.ru',
            login: 'ivanivanov',
            firstName: 'Иван',
            secondName: 'Иванов',
            phone: '+7 (909) 967 30 30',
            password: 'mypass',
            confirmedPassword: 'mypass',
        });
        document.getElementById('sign-in')?.addEventListener('click', () => {
            this.router.navigate('/');
        });
        document.getElementById('sign-up')?.addEventListener('click', () => {
            this.router.navigate('/chat');
        });
    };

    renderChat = () => {
        const template = Handlebars.compile(Pages.ChatPage);
        this.appElement.innerHTML = template({});
    };

    private renderErrorPage({
        errorCode,
        description,
    }: {
        errorCode: string;
        description: string;
    }) {
        const template = Handlebars.compile(Pages.ErrorPage);
        this.appElement.innerHTML = template({ errorCode, description });
        document
            .getElementById('back_to_chat')
            ?.addEventListener('click', () => {
                this.router.navigate('/chat');
            });
    }
}
