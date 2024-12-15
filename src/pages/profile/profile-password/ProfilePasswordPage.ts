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

export class ProfilePasswordPage extends Block {
    constructor(props: Props) {
        const appData = props.mediator.getAppData() as AppData;
        const { profileInfo } = appData;

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
                firstName: profileInfo.firstName,
                avatar: profileInfo.avatar,
                className: 'profile-password',
                onBackClick: () => {
                    props.mediator.navigateTo('/profile-info');
                },
                content: [
                    new ProfileForm({
                        mediator: props.mediator,
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
