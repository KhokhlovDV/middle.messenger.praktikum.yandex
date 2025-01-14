import { Block, BlockProps, connect } from '../../../../framework';
import { Button, Link } from '../../../../shared-components';
import { AppStoreType } from '../../../../store';
import { InlineFormField } from '../inline-form-field';
import { createFormFields, FieldsData } from './utils';

interface Props extends BlockProps, FieldsData {
    isInEditMode: boolean;
}

class Form extends Block {
    private formFields: Map<string, InlineFormField> = new Map();

    constructor(props: Props) {
        const formFields = createFormFields({
            disabled: true,
            isPasswordFields: false,
            onBlur: (id, value) => {
                this.onBlur(id, value);
            },
            data: props,
        });

        super({
            isInEditMode: props.isInEditMode,
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    alert('te');
                },
            },
            FormFields: [...formFields.values()],
            SubmitButton: new Button({
                text: 'Сохранить',
                className: 'settings-form__button',
                type: 'submit',
            }),
            Links: [
                new Link({
                    text: 'Изменить данные',
                    className: 'link-accent link-l',
                    onLinkClick: () => {},
                }),
                new Link({
                    text: 'Изменить пароль',
                    className: 'link-accent link-l',
                    onLinkClick: () => {},
                }),
                new Link({
                    text: 'Выйти',
                    className: 'link-tertiary link-l',
                    onLinkClick: () => {},
                }),
            ],
        });
        this.formFields = formFields;
    }

    onBlur(id: string, value: string) {}

    protected override componentDidUpdate = (
        oldProps: Props,
        newProps: Props
    ) => {
        return true;
    };

    render() {
        return `<div>
                    <form class="settings-form">
                        <div class="settings__block">
                            {{{FormFields}}}
                        </div>
                        {{#if isInEditMode}}
                            {{{SubmitButton}}}
                        {{else}}
                        <div class="settings__block">
                            {{{Links}}}
                        </div>
                        {{/if}}
                    </form>
                </div>`;
    }
}

export const SettingsForm = connect<AppStoreType>((state) =>
    state.user
        ? {
              first_name: state.user.first_name,
              second_name: state.user.second_name,
              phone: state.user.phone,
              login: state.user.login,
              email: state.user.first_name,
          }
        : {}
)(Form);
