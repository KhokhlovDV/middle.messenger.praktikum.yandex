import { Routes } from '../../../constants';
import { authController } from '../../../controllers';
import { Block } from '../../../framework';
import { Router } from '../../../router';
import { helper } from '../../../utils/helper';
import { FormInputProps, SignLayout } from '../components';

const formFields: FormInputProps[] = [
    { id: 'email', label: 'Почта', type: 'email' },
    { id: 'login', label: 'Логин', type: 'text' },
    { id: 'first_name', label: 'Имя', type: 'text' },
    { id: 'second_name', label: 'Фамилия', type: 'text' },
    { id: 'phone', label: 'Телефон', type: 'tel' },
    { id: 'password', label: 'Пароль', type: 'password' },
    { id: 'confirmedPassword', label: 'Пароль (еще раз)', type: 'password' },
];

interface Form {
    [key: string]: string;
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    password: string;
    confirmedPassord: string;
}

export class SignUpPage extends Block {
    private signLayout: SignLayout;

    constructor() {
        const signLayout = new SignLayout({
            buttonText: 'Зарегистрироваться',
            headerText: 'Регистрация',
            linkText: 'Войти',
            formFields,
            onFormSuccess: (form) => {
                const data = helper.convertFormToObject<Form>(form);
                authController
                    .signUp(data)
                    .then(() => this.onSignUpError())
                    .catch((error: Error) => {
                        this.onSignUpError(error.message);
                    });
            },
            onLinkClick: () => {
                Router.getInstance().go(Routes.Default);
            },
        });
        super({
            SignLayout: signLayout,
        });
        this.signLayout = signLayout;
    }

    onSignUpError(message?: string) {
        this.signLayout.setProps({
            errorMessage: message,
        });
    }

    render() {
        return `<div class='modal-window sign-up'>{{{SignLayout}}}</div>`;
    }
}
