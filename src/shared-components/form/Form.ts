import { Block, BlockProps } from '../../framework';
import { helper, Validator } from '../../utils';
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
    formId?: number;
}

export class Form extends Block {
    private formFields: Map<string, FormField>;

    private button: Button;

    constructor(props: Props) {
        const formFieldsMap = new Map<string, FormField>();
        const { formFields, onFormSuccess, ...other } = props;
        formFields.forEach((field) =>
            formFieldsMap.set(
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

        const button = new Button({
            className: other.buttonClassName,
            type: 'submit',
            text: other.buttonText,
        });

        super({
            ...other,
            Button: button,
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    const target = e.target as HTMLFormElement;
                    const data = helper.convertFormToObject(target);
                    const result = Validator.validate(data);
                    this.onValidate(result);
                    if (!result.filter((el) => el.errorMessage !== '').length) {
                        onFormSuccess(target);
                    }
                },
            },
            FormField: [...formFieldsMap.values()],
        });
        this.formFields = formFieldsMap;
        this.button = button;
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

    protected override componentDidUpdate = (
        oldProps: Props,
        newProps: Props
    ) => {
        if (oldProps.buttonText !== newProps.buttonText) {
            this.button.setProps({
                text: newProps.buttonText,
            });
        }
        if (oldProps.formId !== newProps.formId) {
            [...this.formFields.values()].forEach((field) => {
                field.setProps({
                    formId: newProps.formId,
                    errorMessage: '',
                });
            });
        }
        return true;
    };

    render() {
        return `<form class="{{className}}">
            <div>
                {{{FormField}}}
            </div>
            {{{Button}}}
        </form>`;
    }
}
