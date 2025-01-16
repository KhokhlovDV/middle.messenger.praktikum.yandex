import { Block, BlockProps } from '../../framework';
import { helper } from '../../utils/helper';
import { ValidationResult, Validator } from '../../utils/Validator';
import { Button } from '../button';
import { FormField } from '../form-field';

export interface FormInputProps {
    type: string;
    label: string;
    id: string;
}

interface Props extends BlockProps {
    buttonText: string;
    formFields: FormInputProps[];
    onFormSuccess: (form: HTMLFormElement) => void;
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
                    const target = e.target as HTMLFormElement;
                    const data = helper.convertFormToObject(target);
                    const result = Validator.validate(data);
                    this.onValidate(result);
                    if (!result.filter((el) => el.errorMessage !== '').length) {
                        props.onFormSuccess(target);
                    }
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
