import Block, { BlockProps } from '../../../framework/Block';
import { Mediator } from '../../../utils/Mediator';
import { FormInputProps } from '../components/form/Form';
import { SignLayout } from '../components/sign-layout';

const formFields: FormInputProps[] = [
    { id: 'login', label: 'Логин', type: 'text' },
    { id: 'password', label: 'Пароль', type: 'password' },
];

interface Props extends BlockProps {
    mediator: Mediator;
}

export class SignIn extends Block {
    constructor(props: Props) {
        super({
            SignLayout: new SignLayout({
                buttonText: 'Войти',
                headerText: 'Вход',
                linkText: 'Нет аккаунта?',
                linkTo: '/sign-up',
                formFields,
                mediator: props.mediator,
            }),
        });
    }

    render() {
        return `<div class='modal-window sign-in'>{{{SignLayout}}}</div>`;
    }
}
