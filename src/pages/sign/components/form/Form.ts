import Block, { BlockProps } from '../../../../framework/Block';
import { Button } from '../../../../shared-components/button';
import { helper } from '../../../../utils/helper';
import { Mediator } from '../../../../utils/Mediator';
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

export class Form extends Block {
    private formFields: Map<string, FormField>;

    private mediator: Mediator;

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
            Button: new Button({
                className: props.buttonClassName,
                type: 'submit',
                text: props.buttonText,
            }),
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    this.onValidateForm(formData);
                    helper.consoleFormData(formData);
                },
            },
            FormField: [...formFields.values()],
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
            <div>
                {{{FormField}}}
            </div>
            {{{Button}}}
        </form>`;
    }
}
