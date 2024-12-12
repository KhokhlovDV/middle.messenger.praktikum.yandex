import Block from '../../../framework/Block';
import { FormInputProps } from '../components/form/Form';
import { SignLayout } from '../components/sign-layout';

const formFields: FormInputProps[] = [
    { id: 'login', label: 'Логин', type: 'text' },
    { id: 'password', label: 'Пароль', type: 'password' },
];

export class SignIn extends Block {
    constructor() {
        super({
            SignLayout: new SignLayout({
                buttonText: 'Войти',
                headerText: 'Вход',
                linkText: 'Нет аккаунта?',
                linkTo: '/sign-up',
                formFields,
                onLinkClick(to) {
                    console.log(`link click: ${to}`);
                },
                onFormSubmit(data) {
                    for (let pair of data.entries()) {
                        console.log(`submit: ${pair[0]} = ${pair[1]}`);
                    }
                },
                onBlur(id, value) {
                    console.log(`blur: ${id} ${value}`);
                },
            }),
        });
    }

    render() {
        return `<div class='modal-window sign-in'>{{{SignLayout}}}</div>`;
    }
}
