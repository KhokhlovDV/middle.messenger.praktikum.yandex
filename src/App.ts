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
import { AvatarPicker } from './pages/profile/components/avatar-picker';
import { Avatar } from './pages/chat/components/avatar';
import { Button } from './shared-components/button';
import { Link } from './shared-components/link';
import { RoundedButton } from './shared-components/rounded-button';
import { ModalWindow } from './shared-components/modal-window';
import { ChatFeed } from './pages/chat/components/chat-feed';
import { ChatFeedItem } from './pages/chat/components/chat-feed-item';
import { ChatMessage } from './pages/chat/components/chat-message';
import { ChatMyMessageBox } from './pages/chat/components/chat-my-message-box';

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
Handlebars.registerPartial('ChatMessage', ChatMessage);
Handlebars.registerPartial('ChatMyMessageBox', ChatMyMessageBox);
Handlebars.registerPartial('ChatFeed', ChatFeed);
Handlebars.registerPartial('ChatFeedItem', ChatFeedItem);

const appendHelper = (s1: string, s2: string) => `${s1} ${s2}`;
Handlebars.registerHelper('append', appendHelper);

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
        const template = Handlebars.compile(Pages.ErrorPage);
        this.appElement.innerHTML = template(data.notFound);
        this.setLinkListeners();
    };

    renderServerError = () => {
        const template = Handlebars.compile(Pages.ErrorPage);
        this.appElement.innerHTML = template(data.serverError);
        this.setLinkListeners();
    };

    renderSignIn = () => {
        const template = Handlebars.compile(Pages.SignIn);
        this.appElement.innerHTML = template(data.signIn);
        this.addFormSubmitById('sign-in', () => {
            this.router.navigate('/chat');
        });
        this.setLinkListeners();
    };

    renderSignUp = () => {
        const template = Handlebars.compile(Pages.SignUp);
        this.appElement.innerHTML = template(data.signUp);
        this.addFormSubmitById('sign-up', () => {
            this.router.navigate('/chat');
        });
        this.setLinkListeners();
    };

    renderChat = () => {
        const template = Handlebars.compile(Pages.ChatPage);
        this.appElement.innerHTML = template(data.chat);
        this.addFormSubmitById('send-message');
        this.setLinkListeners();
    };

    renderProfile = () => {
        const template = Handlebars.compile(Pages.ProfileInfoPage);
        this.appElement.innerHTML = template(data.profile);
        this.addClickListenerById('back-button', () => {
            this.router.navigate('/chat');
        });
        this.setLinkListeners();
    };

    renderChangeProfile = () => {
        const template = Handlebars.compile(Pages.ProfilePersonalDataPage);
        this.appElement.innerHTML = template(data.changeProfile);
        this.addClickListenerById('back-button', () => {
            this.router.navigate('/profile');
        });
        this.addFormSubmitById('profile-form', () => {
            this.router.navigate('/profile');
        });
    };

    renderChangePassword = () => {
        const template = Handlebars.compile(Pages.ProfilePasswordPage);
        this.appElement.innerHTML = template(data.passwordChange);
        this.addClickListenerById('back-button', () => {
            this.router.navigate('/profile');
        });
        this.addFormSubmitById('password-form', () => {
            this.router.navigate('/profile');
        });
    };

    private addFormSubmitById(id: string, onClick?: () => void) {
        document.getElementById(id)?.addEventListener('submit', (e) => {
            e.preventDefault();
            onClick?.();
        });
    }

    private addClickListenerById(id: string, onClick: () => void) {
        document.getElementById(id)?.addEventListener('click', () => {
            onClick();
        });
    }

    private setLinkListeners() {
        const links = document.querySelectorAll('a');
        links.forEach((link) => {
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
}
