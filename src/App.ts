import Handlebars from 'handlebars';
import { Button } from './components/button';
import * as Pages from './pages';
import { Router } from './Router';
import { FormField } from './components/form-field';
import { Link } from './components/link';
import { Avatar } from './components/avatar';
import { RoundedButton } from './components/rounded-button';
import { ProfileLayout } from './components/profile-layout';
import { InlineFormField } from './components/inline-form-field';
import { AvatarPicker } from './components/avatar-picker';
import { ModalWindow } from './components/modal-window';
import { SignLayout } from './components/sign-layout';
import { ProfileBlock } from './components/profile-block';
import { data } from './mock-data';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('FormField', FormField);
Handlebars.registerPartial('InlineFormField', InlineFormField);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Avatar', Avatar);
Handlebars.registerPartial('RoundedButton', RoundedButton);
Handlebars.registerPartial('ProfileLayout', ProfileLayout);
Handlebars.registerPartial('AvatarPicker', AvatarPicker);
Handlebars.registerPartial('ModalWindow', ModalWindow);
Handlebars.registerPartial('SignLayout', SignLayout);
Handlebars.registerPartial('ProfileBlock', ProfileBlock);

Handlebars.registerHelper('append', function (s1, s2) {
    return `${s1} ${s2}`;
});

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
                {
                    path: '/change-profile',
                    onRouteMatch: this.renderChangeProfile,
                },
                {
                    path: '/change-password',
                    onRouteMatch: this.renderChangePassword,
                },
            ],
            onRouteNotFound: this.renderNotFound,
        });
    }

    renderNotFound = () => {
        this.renderErrorPage(data.notFound);
    };

    renderServerError = () => {
        this.renderErrorPage(data.serverError);
    };

    renderSignIn = () => {
        const template = Handlebars.compile(Pages.SignIn);
        this.appElement.innerHTML = template(data.signIn);
        document.getElementById('sign-in')?.addEventListener('click', () => {
            this.router.navigate('/chat');
        });
        this.setLinkListeners();
    };

    renderSignUp = () => {
        const template = Handlebars.compile(Pages.SignUp);
        this.appElement.innerHTML = template(data.signUp);
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
        this.appElement.innerHTML = template(data.profile);
        document
            .getElementById('back-button')
            ?.addEventListener('click', () => {
                this.router.navigate('/chat');
            });
        this.setLinkListeners();
    };

    renderChangeProfile = () => {
        const template = Handlebars.compile(Pages.ProfilePersonalDataPage);
        this.appElement.innerHTML = template(data.changeProfile);
        document.getElementById('save')?.addEventListener('click', () => {
            this.router.navigate('/profile');
        });
        document
            .getElementById('back-button')
            ?.addEventListener('click', () => {
                this.router.navigate('/profile');
            });
    };

    renderChangePassword = () => {
        const template = Handlebars.compile(Pages.ProfilePasswordPage);
        this.appElement.innerHTML = template(data.passwordChange);
        document.getElementById('save')?.addEventListener('click', () => {
            this.router.navigate('/profile');
        });
        document
            .getElementById('back-button')
            ?.addEventListener('click', () => {
                this.router.navigate('/profile');
            });
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
