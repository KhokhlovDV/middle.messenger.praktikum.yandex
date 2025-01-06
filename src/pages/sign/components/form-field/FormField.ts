import { Block, BlockProps } from '../../../../framework';
import { Input } from '../../../../shared-components';

interface Props extends BlockProps {
    label: string;
    id: string;
    type?: string;
    value?: string;
    errorMessage?: string;
    onBlur: (value: string) => void;
}

export class FormField extends Block {
    constructor(props: Props) {
        super({
            id: props.id,
            label: props.label,
            errorMessage: props.errorMessage,
            Input: new Input({
                id: props.id,
                type: props.type,
                value: props.value,
                onBlur: (target) => {
                    props.onBlur(target);
                },
                attr: {
                    class: 'form-field__input',
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
