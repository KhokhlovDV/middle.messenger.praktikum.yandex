import Block from '../../../../framework/Block';
import { Input } from '../../../../shared-components/input';

interface Props {
    label: string;
    onBlur: (id: string, value: string) => void;
    id: string;
    type?: string;
    value?: string;
}

export class FormField extends Block {
    constructor(props: Props) {
        super({
            id: props.id,
            label: props.label,
            Input: new Input({
                className: 'form-field__input',
                ...props,
            }),
        });
    }

    render() {
        return `<div class='form-field'>
                    <label class='form-field__label' for='{{id}}'>{{label}}</label>
                    {{{Input}}}
                </div>`;
    }
}
