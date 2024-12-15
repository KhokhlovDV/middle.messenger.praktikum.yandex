import Block, { BlockProps } from '../../../../framework/Block';
import { Input } from '../../../../shared-components/input';

interface Props extends BlockProps {
    id: string;
    label: string;
    type: string;
    errorMessage: string;
    disabled: boolean;
    onBlur: (target: HTMLInputElement) => void;
    value?: string;
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
                attr: {
                    class: 'inline-form-field__input',
                },
                onBlur: (target) => {
                    if (props.onBlur) {
                        props.onBlur(target);
                    }
                },
            }),
        });
    }

    render() {
        return `<div class="inline-form-field">
                    <label for='{{id}}'>{{label}}</label>
                    {{{Input}}}
                </div>`;
    }
}
