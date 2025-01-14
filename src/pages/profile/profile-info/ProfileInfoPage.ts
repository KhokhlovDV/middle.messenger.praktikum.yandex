import { Routes } from '../../../constants';
import { Block } from '../../../framework';
import { Router } from '../../../router';
import { Link } from '../../../shared-components';
import {
    FormInputProps,
    ProfileBlock,
    ProfileForm,
    ProfileLayout,
} from '../components';

export class ProfileInfoPage extends Block {
    constructor() {
        const formFields: FormInputProps[] = [];
        formFields.push({
            id: 'email',
            type: 'email',
            label: 'Почта',
            value: 'kohkhlov.dv@gmail.com',
            disabled: true,
        });
        formFields.push({
            id: 'login',
            type: 'text',
            label: 'Логин',
            value: 'login val',
            disabled: true,
        });
        formFields.push({
            id: 'first_name',
            type: 'text',
            label: 'Имя',
            value: 'first_name val',
            disabled: true,
        });
        formFields.push({
            id: 'second_name',
            type: 'text',
            label: 'Фамилия',
            value: 'second_name val',
            disabled: true,
        });
        formFields.push({
            id: 'phone',
            type: 'tel',
            label: 'Телефон',
            value: 'phone val',
            disabled: true,
        });

        super({
            ProfileLayout: new ProfileLayout({
                firstName: 'first_name',
                avatar: 'fdsfsd',
                className: 'profile',
                onBackClick() {
                    Router.getInstance().back();
                },
                content: [
                    new ProfileForm({
                        className: 'profile__form',
                        formFields,
                    }),
                    new ProfileBlock({
                        content: [
                            new Link({
                                text: 'Изменить данные',
                                className: 'link-accent link-l',
                                onLinkClick() {
                                    Router.getInstance().go(Routes.ProfileData);
                                },
                            }),
                            new Link({
                                text: 'Изменить пароль',
                                className: 'link-accent link-l',
                                onLinkClick() {
                                    Router.getInstance().go(
                                        Routes.ProfilePassword
                                    );
                                },
                            }),
                            new Link({
                                text: 'Выйти',
                                className: 'link-tertiary link-l',
                                onLinkClick() {
                                    //Router.getInstance().go(Routes.ProfileData);
                                },
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
