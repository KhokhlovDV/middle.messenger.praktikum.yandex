import Handlebars from 'handlebars';
import * as Pages from './pages';
import { Router } from './Router';
import { data } from './mock-data';
import { FormField } from './pages/sign/components/form-field';
import { SignLayout } from './pages/sign/components/sign-layout';
import { InlineFormField } from './pages/profile/components/inline-form-field';
import { ProfileLayout } from './pages/profile/components/profile-layout';
import { ProfileBlock } from './pages/profile/components/profile-block';
import { ChatLayout } from './pages/chat/components/chat-layout';
import { ChatHeader } from './pages/chat/components/chat-header';
import { ChatMessages } from './pages/chat/components/chat-messages';
import { ChatMessageBox } from './pages/chat/components/chat-message-box';
import { AvatarPicker } from './pages/profile/components/avatar-picker';
import { Avatar } from './pages/chat/components/avatar';
import { Button } from './shared-components/button';
import { Link } from './shared-components/link';
import { RoundedButton } from './shared-components/rounded-button';
import { ModalWindow } from './shared-components/modal-window';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('RoundedButton', RoundedButton);
Handlebars.registerPartial('ModalWindow', ModalWindow);

Handlebars.registerPartial('SignLayout', SignLayout);
Handlebars.registerPartial('FormField', FormField);

Handlebars.registerPartial('ProfileLayout', ProfileLayout);
Handlebars.registerPartial('InlineFormField', InlineFormField);
Handlebars.registerPartial('ProfileBlock', ProfileBlock);
Handlebars.registerPartial('AvatarPicker', AvatarPicker);

Handlebars.registerPartial('Avatar', Avatar);
Handlebars.registerPartial('ChatLayout', ChatLayout);
Handlebars.registerPartial('ChatHeader', ChatHeader);
Handlebars.registerPartial('ChatMessages', ChatMessages);
Handlebars.registerPartial('ChatMessageBox', ChatMessageBox);

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
        this.appElement.innerHTML = template(data.chat);
        this.setLinkListeners();
    };

    renderProfile = () => {
        const template = Handlebars.compile(Pages.ProfileInfoPage);
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
