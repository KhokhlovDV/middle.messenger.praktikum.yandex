import Block, { BlockProps } from '../../../../framework/Block';
import { Button } from '../../../../shared-components/button';
import { helper } from '../../../../utils/helper';
import { Mediator } from '../../../../utils/Mediator';
import { InlineFormField } from '../inline-form-field';
import { ProfileBlock } from '../profile-block';

export interface FormInputProps {
    id: string;
    label: string;
    type: string;
    disabled: boolean;
    value?: string;
    placeholder?: string;
}

interface Props extends BlockProps {
    formFields: FormInputProps[];
    mediator: Mediator;
    button?: Button;
    className?: string;
}

export class ProfileForm extends Block {
    private formFields: Map<string, InlineFormField>;

    private mediator: Mediator;

    constructor(props: Props) {
        const formFields = new Map<string, InlineFormField>();
        props.formFields.forEach((field) =>
            formFields.set(
                field.id,
                new InlineFormField({
                    id: field.id,
                    label: field.label,
                    type: field.type,
                    errorMessage: '',
                    disabled: field.disabled,
                    value: field.value,
                    placeholder: field.placeholder,
                    onBlur: (target) => {
                        const formData = new FormData();
                        formData.set(target.id, target.value);
                        this.onValidateForm(formData);
                    },
                })
            )
        );

        super({
            className: props.className,
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    this.onValidateForm(formData);
                    helper.consoleFormData(formData);
                },
            },
            ProfileBlock: new ProfileBlock({
                content: [...formFields.values()],
            }),
            Button: props.button,
        });
        this.formFields = formFields;
        this.mediator = props.mediator;
    }

    onValidateForm(data: FormData) {
        this.mediator.validate(data).forEach((error) => {
            const formField = this.formFields.get(error.id);
            if (formField) {
                formField.setProps({
                    errorMessage: error.errorMessage,
                });
            }
        });
    }

    render() {
        return `<form class="{{className}}">
                    {{{ProfileBlock}}}
                    {{{Button}}}
                </form>`;
    }
}
