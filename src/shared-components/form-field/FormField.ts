import { Block, BlockProps } from '../../framework';
import { Input } from '../input';

interface Props extends BlockProps {
    label: string;
    id: string;
    type?: string;
    value?: string;
    errorMessage?: string;
    onBlur: (value: string) => void;
    formId?: number;
}

export class FormField extends Block {
    private input: Input;

    constructor(props: Props) {
        const { onBlur, ...other } = props;
        const input = new Input({
            id: other.id,
            type: other.type,
            value: other.value,
            onBlur: (target) => {
                onBlur(target);
            },
            attr: {
                class: 'form-field__input',
            },
        });
        super({
            ...other,
            Input: input,
        });
        this.input = input;
    }

    protected override componentDidUpdate = (
        oldProps: Props,
        newProps: Props
    ) => {
        if (oldProps.formId !== newProps.formId) {
            this.input.setProps({
                value: '',
            });
        }
        return true;
    };

    render() {
        return `<div class='form-field'>
                    <label class='form-field__label' for='{{id}}'>{{label}}</label>
                    {{{Input}}}
                    {{#if errorMessage}}
                        <div class='form-field__error'>{{errorMessage}}</div>
                    {{/if}}
                </div>`;
    }
}
