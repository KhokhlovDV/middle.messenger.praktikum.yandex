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

    private isPasswordFields = false;

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
            ...props,
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    alert('te');
                },
            },
            FormFields: [...formFields.values()],
            SubmitButton: new Button({
                text: 'Сохранить',
                type: 'submit',
            }),
            CancelButton: new Button({
                text: 'Отменить',
                onClick: () => {
                    this.updateLayout({
                        isInEditMode: false,
                        isPasswordFields: false,
                    });
                },
            }),
            Links: [
                new Link({
                    text: 'Изменить данные',
                    className: 'link-accent link-l',
                    onLinkClick: () => {
                        this.updateLayout({
                            isInEditMode: true,
                            isPasswordFields: false,
                        });
                    },
                }),
                new Link({
                    text: 'Изменить пароль',
                    className: 'link-accent link-l',
                    onLinkClick: () => {
                        this.updateLayout({
                            isInEditMode: true,
                            isPasswordFields: true,
                        });
                    },
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

    protected override componentDidUpdate = (
        oldProps: Props,
        newProps: Props
    ) => {
        for (const key in oldProps) {
            const oldValue = oldProps[key];
            const newValue = newProps[key];
            if (oldValue !== newValue && this.formFields.has(key)) {
                const InputField = this.formFields.get(key)!;
                InputField.setProps({
                    value: newValue,
                });
            }
        }
        return true;
    };

    render() {
        return `<div>
                    <form class="settings-form">
                        <div class="settings-form__block">
                            {{{FormFields}}}
                        </div>
                        {{#if isInEditMode}}
                            <div class="settings-form__buttons">
                                {{{SubmitButton}}}
                                {{{CancelButton}}}
                            </div>
                        {{else}}
                        <div class="settings-form__block">
                            {{{Links}}}
                        </div>
                        {{/if}}
                    </form>
                </div>`;
    }

    private updateLayout({
        isInEditMode,
        isPasswordFields,
    }: {
        isInEditMode: boolean;
        isPasswordFields: boolean;
    }) {
        this.formFields = createFormFields({
            disabled: !isInEditMode,
            isPasswordFields,
            onBlur: (id, value) => {
                this.onBlur(id, value);
            },
            data: this.props as Props,
        });
        this.isPasswordFields = isPasswordFields;
        this.setProps({
            isInEditMode,
        });
        this.setLists({
            FormFields: [...this.formFields.values()],
        });
    }

    private onBlur(id: string, value: string) {}
}

export const SettingsForm = connect<AppStoreType>((state) =>
    state.user
        ? {
              first_name: state.user.first_name,
              second_name: state.user.second_name,
              phone: state.user.phone,
              login: state.user.login,
              email: state.user.email,
          }
        : {}
)(Form);
