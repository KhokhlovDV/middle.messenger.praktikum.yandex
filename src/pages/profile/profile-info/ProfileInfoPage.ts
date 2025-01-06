import { Block, BlockProps } from '../../../framework';
import { Link } from '../../../shared-components';
import { Mediator } from '../../../utils/Mediator';
import { AppData } from '../../../utils/Store';
import {
    FormInputProps,
    ProfileBlock,
    ProfileForm,
    ProfileLayout,
} from '../components';

interface Props extends BlockProps {
    mediator: Mediator;
}

export class ProfileInfoPage extends Block {
    constructor(props: Props) {
        const appData = props.mediator.getAppData() as AppData;
        const { profileInfo } = appData;

        const formFields: FormInputProps[] = [];
        formFields.push({
            id: 'email',
            type: 'email',
            label: 'Почта',
            value: profileInfo.email,
            disabled: true,
        });
        formFields.push({
            id: 'login',
            type: 'text',
            label: 'Логин',
            value: profileInfo.login,
            disabled: true,
        });
        formFields.push({
            id: 'first_name',
            type: 'text',
            label: 'Имя',
            value: profileInfo.firstName,
            disabled: true,
        });
        formFields.push({
            id: 'second_name',
            type: 'text',
            label: 'Фамилия',
            value: profileInfo.secondName,
            disabled: true,
        });
        formFields.push({
            id: 'phone',
            type: 'tel',
            label: 'Телефон',
            value: profileInfo.phone,
            disabled: true,
        });

        super({
            ProfileLayout: new ProfileLayout({
                firstName: profileInfo.firstName,
                avatar: profileInfo.avatar,
                className: 'profile',
                onBackClick: () => {
                    props.mediator.navigateTo('/chat');
                },
                content: [
                    new ProfileForm({
                        className: 'profile__form',
                        mediator: props.mediator,
                        formFields,
                    }),
                    new ProfileBlock({
                        content: [
                            new Link({
                                mediator: props.mediator,
                                text: 'Изменить данные',
                                to: '/change-profile',
                                className: 'link-accent link-l',
                            }),
                            new Link({
                                mediator: props.mediator,
                                text: 'Изменить пароль',
                                to: '/change-password',
                                className: 'link-accent link-l',
                            }),
                            new Link({
                                mediator: props.mediator,
                                text: 'Выйти',
                                to: '/',
                                className: 'link-tertiary link-l',
                            }),
                        ],
                    }),
                ],
            }),
        });
    }

    render() {
        return `<div>{{{ProfileLayout}}}</div>`;
    }
}
