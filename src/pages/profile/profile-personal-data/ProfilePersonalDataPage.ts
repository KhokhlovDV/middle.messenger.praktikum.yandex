import { Block } from '../../../framework';
import { Router } from '../../../router';
import { Button } from '../../../shared-components';
import { FormInputProps, ProfileForm, ProfileLayout } from '../components';

export class ProfilePersonalDataPage extends Block {
    constructor() {
        const formFields: FormInputProps[] = [];
        formFields.push({
            id: 'email',
            type: 'email',
            label: 'Почта',
            disabled: false,
            value: 'kohkhlov.dv@gmail.com',
        });
        formFields.push({
            id: 'login',
            type: 'text',
            label: 'Логин',
            disabled: false,
            value: 'login',
        });
        formFields.push({
            id: 'first_name',
            type: 'text',
            label: 'Имя',
            disabled: false,
            value: 'first_name',
        });
        formFields.push({
            id: 'second_name',
            type: 'text',
            label: 'Фамилия',
            disabled: false,
            value: 'first_name',
        });
        formFields.push({
            id: 'phone',
            type: 'tel',
            label: 'Телефон',
            disabled: false,
            value: 'first_name',
        });

        super({
            ProfileLayout: new ProfileLayout({
                firstName: 'fsd',
                avatar: 'fds',
                className: 'profile-personal-data',
                onBackClick: () => {
                    Router.getInstance().back();
                },
                content: [
                    new ProfileForm({
                        formFields,
                        button: new Button({
                            text: 'Сохранить',
                            className: 'profile-personal-data__button',
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
