import { Block, BlockProps } from '../../../../framework';
import { Input } from '../../../../shared-components';

interface Props extends BlockProps {
    id: string;
    label: string;
    type: string;
    disabled?: boolean;
    errorMessage?: string;
    onBlur?: (value: string, id: string) => void;
    value?: string;
    placeholder?: string;
}

export class InlineFormField extends Block {
    constructor(props: Props) {
        super({
            id: props.id,
            label: props.label,
            Input: new Input({
                id: props.id,
                type: props.type,
                disabled: props.disabled,
                value: props.value,
                placeholder: props.placeholder,
                attr: {
                    class: 'inline-form-field__input',
                },
                onBlur: (target) => {
                    if (props.onBlur) {
                        props.onBlur(target, props.id);
                    }
                },
            }),
        });
    }

    render() {
        return `<div class="inline-form-field">
                    <div class="inline-form-field__container">
                        <label for='{{id}}'>{{label}}</label>
                        {{#if errorMessage}}
                            <div class='inline-form-field__error'>{{errorMessage}}</div>
                        {{/if}}
                    </div>
                    {{{Input}}}
                </div>`;
    }
}
