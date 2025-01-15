import { authController, userController } from '../../../../controllers';
import { Block, BlockProps, connect } from '../../../../framework';
import { Button, Link } from '../../../../shared-components';
import { AppStoreType } from '../../../../store';
import { helper } from '../../../../utils/helper';
import { ValidationResult, Validator } from '../../../../utils/Validator';
import { InlineFormField } from '../inline-form-field';
import { createFormFields, FieldsData } from './utils';

interface PasswordForm extends Record<string, string> {
    oldPassword: string;
    newPassword: string;
    confirmedPassword: string;
}

interface PersonalDataForm extends Record<string, string> {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
}

interface Props extends BlockProps, FieldsData {
    isInEditMode: boolean;
    errorMessage: string;
}

class Form extends Block {
    private formFields: Map<string, InlineFormField> = new Map();

    private isPasswordFields = false;

    constructor(props: Props) {
        const formFields = createFormFields({
            disabled: true,
            isPasswordFields: false,
            onBlur: (value, id) => {
                this.onBlur(value, id);
            },
            data: props,
        });

        super({
            ...props,
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    const target = e.target as HTMLFormElement;
                    const data = helper.convertFormToObject(target);
                    const result = Validator.validate(data);
                    this.onValidate(result);
                    if (!result.filter((el) => el.errorMessage !== '').length) {
                        if (this.isPasswordFields) {
                            this.onSubmitPasswordForm(data as PasswordForm);
                        } else {
                            this.onSubmitPersonalDataForm(
                                data as PersonalDataForm
                            );
                        }
                    }
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
                    onLinkClick: () => {
                        authController.logout();
                    },
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
                    {{#if errorMessage}}
                        <div class='settings-form__error'>{{errorMessage}}</div>
                    {{/if}}
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
            errorMessage: '',
        });
        this.setLists({
            FormFields: [...this.formFields.values()],
        });
    }

    private onBlur(value: string, id: string) {
        const result = Validator.validate({
            [id]: value,
        });
        this.onValidate(result);
    }

    private onValidate(results: ValidationResult[]) {
        results.forEach((result) => {
            const formField = this.formFields.get(result.id);
            if (!formField) {
                return;
            }
            formField.setProps({
                errorMessage: result.errorMessage,
            });
        });
    }

    private onSubmitPasswordForm(data: PasswordForm) {
        this.onSubmitResult(userController.password(data));
    }

    private onSubmitPersonalDataForm(data: PersonalDataForm) {
        this.onSubmitResult(userController.profile(data));
    }

    private onSubmitResult(result: Promise<unknown>) {
        result
            .then(() => {
                this.updateLayout({
                    isInEditMode: false,
                    isPasswordFields: false,
                });
            })
            .catch((e: Error) => {
                this.setProps({
                    errorMessage: e.message,
                });
            });
    }
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
