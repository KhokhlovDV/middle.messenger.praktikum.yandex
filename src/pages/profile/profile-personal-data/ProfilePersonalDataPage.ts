import Block, { BlockProps } from '../../../framework/Block';
import { Button } from '../../../shared-components/button';
import { Mediator } from '../../../utils/Mediator';
import { AppData } from '../../../utils/Store';
import {
    FormInputProps,
    ProfileForm,
} from '../components/profile-form/ProfileForm';
import { ProfileLayout } from '../components/profile-layout';

interface Props extends BlockProps {
    mediator: Mediator;
}

export class ProfilePersonalDataPage extends Block {
    constructor(props: Props) {
        const appData = props.mediator.getAppData() as AppData;
        const { profileInfo } = appData;

        const formFields: FormInputProps[] = [];
        formFields.push({
            id: 'email',
            type: 'email',
            label: 'Почта',
            disabled: false,
            value: profileInfo.email,
        });
        formFields.push({
            id: 'login',
            type: 'text',
            label: 'Логин',
            disabled: false,
            value: profileInfo.login,
        });
        formFields.push({
            id: 'first_name',
            type: 'text',
            label: 'Имя',
            disabled: false,
            value: profileInfo.firstName,
        });
        formFields.push({
            id: 'second_name',
            type: 'text',
            label: 'Фамилия',
            disabled: false,
            value: profileInfo.secondName,
        });
        formFields.push({
            id: 'phone',
            type: 'tel',
            label: 'Телефон',
            disabled: false,
            value: profileInfo.phone,
        });

        super({
            ProfileLayout: new ProfileLayout({
                firstName: profileInfo.firstName,
                avatar: profileInfo.avatar,
                className: 'profile-personal-data',
                onBackClick: () => {
                    props.mediator.navigateTo('/profile-info');
                },
                content: [
                    new ProfileForm({
                        mediator: props.mediator,
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
