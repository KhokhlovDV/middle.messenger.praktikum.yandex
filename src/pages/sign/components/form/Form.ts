import Block from '../../../../framework/Block';
import { Button } from '../../../../shared-components/button';
import { FormField } from '../form-field';

export interface FormInputProps {
    type: string;
    label: string;
    id: string;
}

interface Props {
    buttonText: string;
    onFormSubmit: (data: FormData) => void;
    formFields: FormInputProps[];
    onBlur: (id: string, value: string) => void;
    buttonClassName?: string;
    className?: string;
}

export class Form extends Block {
    constructor(props: Props) {
        const formFields = props.formFields.map(
            (field) =>
                new FormField({
                    id: field.id,
                    label: field.label,
                    type: field.type,
                    onBlur: props.onBlur,
                })
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
                    const data = new FormData(e.target as HTMLFormElement);
                    props.onFormSubmit(data);
                },
            },
            FormField: formFields,
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
