import { Block } from '../../../framework';
import { FormInputProps, SignLayout } from '../components';

const formFields: FormInputProps[] = [
    { id: 'login', label: 'Логин', type: 'text' },
    { id: 'password', label: 'Пароль', type: 'password' },
];

export class SignInPage extends Block {
    constructor() {
        super({
            SignLayout: new SignLayout({
                buttonText: 'Войти',
                headerText: 'Вход',
                linkText: 'Нет аккаунта?',
                linkTo: '/sign-up',
                formFields,
            }),
        });
    }

    override render() {
        return `<div class='modal-window sign-in'>{{{SignLayout}}}</div>`;
    }
}
