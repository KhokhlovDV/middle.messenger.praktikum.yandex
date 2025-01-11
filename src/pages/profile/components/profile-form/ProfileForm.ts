import { Block, BlockProps } from '../../../../framework';
import { Button } from '../../../../shared-components';
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
    button?: Button;
    className?: string;
}

export class ProfileForm extends Block {
    private formFields: Map<string, InlineFormField>;

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
                    onBlur: (value) => {
                        // this.validateField(value, field.id);
                    },
                })
            )
        );

        super({
            className: props.className,
            events: {
                submit: (e: SubmitEvent) => {
                    // this.submitForm(e);
                },
            },
            ProfileBlock: new ProfileBlock({
                content: [...formFields.values()],
            }),
            Button: props.button,
        });
        this.formFields = formFields;
    }

    // onValidationResult(result: ValidationResult): void {
    //     const formField = this.formFields.get(result.id);
    //     if (!formField) {
    //         return;
    //     }
    //     formField.setProps({
    //         errorMessage: result.errorMessage,
    //     });
    // }

    render() {
        return `<form class="{{className}}">
                    {{{ProfileBlock}}}
                    {{{Button}}}
                </form>`;
    }
}
