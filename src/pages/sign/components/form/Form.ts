import { BlockProps } from '../../../../framework/Block';
import { BlockWithValidation } from '../../../../framework/BlockWithValidation';
import { Button } from '../../../../shared-components/button';
import { Mediator, ValidationResult } from '../../../../utils/Mediator';
import { FormField } from '../form-field';

export interface FormInputProps {
    type: string;
    label: string;
    id: string;
}

interface Props extends BlockProps {
    buttonText: string;
    formFields: FormInputProps[];
    mediator: Mediator;
    buttonClassName?: string;
    className?: string;
}

export class Form extends BlockWithValidation {
    private formFields: Map<string, FormField>;

    constructor(props: Props) {
        const formFields = new Map<string, FormField>();
        props.formFields.forEach((field) =>
            formFields.set(
                field.id,
                new FormField({
                    id: field.id,
                    label: field.label,
                    type: field.type,
                    errorMessage: '',
                    onBlur: (value) => {
                        this.validateField(value, field.id);
                    },
                })
            )
        );

        super(
            {
                className: props.className,
                Button: new Button({
                    className: props.buttonClassName,
                    type: 'submit',
                    text: props.buttonText,
                }),
                events: {
                    submit: (e: SubmitEvent) => {
                        this.submitForm(e);
                    },
                },
                FormField: [...formFields.values()],
            },
            props.mediator
        );
        this.formFields = formFields;
    }

    onValidationResult(result: ValidationResult): void {
        const formField = this.formFields.get(result.id);
        if (!formField) {
            return;
        }
        formField.setProps({
            errorMessage: result.errorMessage,
        });
    }

    render() {
        return `<form class="{{className}}">
            <div>
                {{{FormField}}}
            </div>
            {{{Button}}}
        </form>`;
    }
}
