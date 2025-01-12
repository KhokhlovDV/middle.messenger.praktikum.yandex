import { Block, BlockProps } from '../../../../framework';
import { Button } from '../../../../shared-components';
import { helper } from '../../../../utils/helper';
import { ValidationResult, Validator } from '../../../../utils/Validator';
import { FormField } from '../form-field';

export interface FormInputProps {
    type: string;
    label: string;
    id: string;
}

interface Props extends BlockProps {
    buttonText: string;
    formFields: FormInputProps[];
    buttonClassName?: string;
    className?: string;
}

export class Form extends Block {
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
                        const result = Validator.validate({
                            [field.id]: value,
                        });
                        this.onValidate(result);
                    },
                })
            )
        );

        super({
            className: props.className,
            Button: new Button({
                className: props.buttonClassName,
                type: 'submit',
                text: props.buttonText,
            }),
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    const data = helper.convertFormToObject(
                        e.target as HTMLFormElement
                    );
                    const result = Validator.validate(data);
                    this.onValidate(result);
                },
            },
            FormField: [...formFields.values()],
        });
        this.formFields = formFields;
    }

    onValidate(results: ValidationResult[]) {
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

    render() {
        return `<form class="{{className}}">
            <div>
                {{{FormField}}}
            </div>
            {{{Button}}}
        </form>`;
    }
}
