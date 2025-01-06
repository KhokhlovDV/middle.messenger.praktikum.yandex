import { Block, BlockProps } from '../../../framework';
import { Mediator } from '../../../utils/Mediator';
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

interface Props extends BlockProps {
    mediator: Mediator;
}

export class SignUpPage extends Block {
    constructor(props: Props) {
        super({
            SignLayout: new SignLayout({
                buttonText: 'Зарегистрироваться',
                headerText: 'Регистрация',
                linkText: 'Войти',
                linkTo: '/',
                formFields,
                mediator: props.mediator,
            }),
        });
    }

    render() {
        return `<div class='modal-window sign-up'>{{{SignLayout}}}</div>`;
    }
}
