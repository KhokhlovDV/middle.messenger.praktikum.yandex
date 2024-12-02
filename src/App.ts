import Handlebars from 'handlebars';
import { Button } from './components/button';
import * as Pages from './pages';
import { Router } from './Router';
import { FormField } from './components/form-field';
import { Link } from './components/link';
import { Avatar } from './components/avatar';
import { RoundedButton } from './components/rounded-button';
import { ProfileLayout } from './components/profile-layout';
import { ProfileFormLayout } from './components/profile-form-layout';
import { InlineFormField } from './components/inline-form-field';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('FormField', FormField);
Handlebars.registerPartial('InlineFormField', InlineFormField);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Avatar', Avatar);
Handlebars.registerPartial('RoundedButton', RoundedButton);
Handlebars.registerPartial('ProfileLayout', ProfileLayout);
Handlebars.registerPartial('ProfileFormLayout', ProfileFormLayout);

export class App {
    private appElement: HTMLDivElement;
    private router: Router;
    constructor() {
        this.appElement = document.getElementById('app') as HTMLDivElement;
        this.router = new Router({
            routes: [
                { path: '/not-found', onRouteMatch: this.renderNotFound },
                { path: '/server-error', onRouteMatch: this.renderServerError },
                { path: '/', onRouteMatch: this.renderSignIn },
                { path: '/sign-up', onRouteMatch: this.renderSignUp },
                { path: '/chat', onRouteMatch: this.renderChat },
                { path: '/profile', onRouteMatch: this.renderProfile },
            ],
            onRouteNotFound: this.renderNotFound,
        });
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
        this.setLinkListeners();
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
        document.getElementById('sign-up')?.addEventListener('click', () => {
            this.router.navigate('/chat');
        });
        this.setLinkListeners();
    };

    renderChat = () => {
        const template = Handlebars.compile(Pages.ChatPage);
        this.appElement.innerHTML = template({
            message: 'Сообщение',
            avatar: 'https://avatar.iran.liara.run/public/50',
            name: 'Вадим',
        });
        this.setLinkListeners();
    };

    renderProfile = () => {
        const template = Handlebars.compile(Pages.ProfilePage);

        this.appElement.innerHTML = template({
            avatar: 'https://avatar.iran.liara.run/public/50',
            email: 'pochta@yandex.ru',
            login: 'ivanivanov',
            firstName: 'Иван',
            secondName: 'Иванов',
            phone: '+7 (909) 967 30 30',
            disabled: true,
        });

        document
            .getElementById('back-button')
            ?.addEventListener('click', () => {
                this.router.navigate('/chat');
            });
        this.setLinkListeners();
    };

    private setLinkListeners() {
        const footerLinks = document.querySelectorAll('a');
        footerLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                if (
                    e.target instanceof HTMLAnchorElement &&
                    e.target.dataset.page
                ) {
                    e.preventDefault();
                    this.router.navigate(e.target.dataset.page);
                }
            });
        });
    }

    private renderErrorPage({
        errorCode,
        description,
    }: {
        errorCode: string;
        description: string;
    }) {
        const template = Handlebars.compile(Pages.ErrorPage);
        this.appElement.innerHTML = template({ errorCode, description });
        this.setLinkListeners();
    }
}
