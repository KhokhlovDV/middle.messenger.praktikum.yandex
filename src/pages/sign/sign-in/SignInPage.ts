import { Routes } from '../../../constants';
import { AuthController } from '../../../controllers/AuthController';
import { Block } from '../../../framework';
import { Router } from '../../../router';
import { helper } from '../../../utils/helper';
import { FormInputProps, SignLayout } from '../components';

interface Form {
    [key: string]: string;
    password: string;
    login: string;
}

const formFields: FormInputProps[] = [
    { id: 'login', label: 'Логин', type: 'text' },
    { id: 'password', label: 'Пароль', type: 'password' },
];

export class SignInPage extends Block {
    private signLayout: SignLayout;

    constructor() {
        const signLayout = new SignLayout({
            buttonText: 'Войти',
            headerText: 'Вход',
            linkText: 'Нет аккаунта?',
            formFields,
            onFormSuccess: (form) => {
                const data = helper.convertFormToObject<Form>(form);
                AuthController.signIn(data)
                    .then(() => this.onSignInError())
                    .catch((error: Error) => {
                        this.onSignInError(error.message);
                    });
            },
            onLinkClick: () => {
                Router.getInstance().go(Routes.SignUp);
            },
        });
        super({
            SignLayout: signLayout,
        });
        this.signLayout = signLayout;
    }

    onSignInError(message?: string) {
        this.signLayout.setProps({
            errorMessage: message,
        });
    }

    override render() {
        return `<div class='modal-window sign-in'>{{{SignLayout}}}</div>`;
    }
}
