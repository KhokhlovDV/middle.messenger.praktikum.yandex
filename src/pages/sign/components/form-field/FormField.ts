import Block from '../../../../framework/Block';
import { Input } from '../../../../shared-components/input';

interface Props {
    label: string;
    id: string;
    type?: string;
    value?: string;
    errorMessage?: string;
    onBlur: (target: HTMLInputElement) => void;
}

export class FormField extends Block {
    constructor(props: Props) {
        super({
            id: props.id,
            label: props.label,
            errorMessage: props.errorMessage,
            Input: new Input({
                className: 'form-field__input',
                id: props.id,
                type: props.type,
                value: props.value,
                onBlur: (target) => {
                    props.onBlur(target);
                },
            }),
        });
    }

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
