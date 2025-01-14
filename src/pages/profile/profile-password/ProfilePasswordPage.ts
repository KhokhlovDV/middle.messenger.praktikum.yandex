import { Block } from '../../../framework';
import { Router } from '../../../router';
import { Button } from '../../../shared-components';
import { FormInputProps, ProfileForm, ProfileLayout } from '../components';

export class ProfilePasswordPage extends Block {
    constructor() {
        const formFields: FormInputProps[] = [];
        formFields.push({
            id: 'oldPassword',
            type: 'password',
            label: 'Старый пароль',
            disabled: false,
            placeholder: '*****',
        });
        formFields.push({
            id: 'newPassword',
            type: 'password',
            label: 'Новый пароль',
            disabled: false,
            placeholder: '*****',
        });
        formFields.push({
            id: 'confirmedPassword',
            type: 'password',
            label: 'Повторите новый пароль',
            disabled: false,
            placeholder: '*****',
        });

        super({
            ProfileLayout: new ProfileLayout({
                firstName: 'Dmitry',
                avatar: 'Avatar',
                className: 'profile-password',
                onBackClick: () => {
                    Router.getInstance().back();
                },
                content: [
                    new ProfileForm({
                        formFields,
                        button: new Button({
                            text: 'Сохранить',
                            className: 'profile-password__button',
                            type: 'submit',
                        }),
                    }),
                ],
            }),
        });
    }

    render() {
        return `<div>{{{ProfileLayout}}}</div>`;
    }
}
