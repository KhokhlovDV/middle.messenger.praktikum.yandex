import { Block, BlockProps } from '../../framework';

interface Props extends BlockProps {
    id: string;
    disabled?: boolean;
    type?: string;
    value?: string;
    placeholder?: string;
    onBlur?: (value: string) => void;
    attr?: Record<string, string>;
    accept?: string;
    isSubmitFormOnChange?: boolean;
}

export class Input extends Block {
    constructor(props: Props) {
        const { onBlur, isSubmitFormOnChange, ...other } = props;
        super({
            ...other,
            events: {
                blur(e: Event) {
                    if (onBlur) {
                        const target = e.target as HTMLInputElement;
                        onBlur(target.value);
                    }
                },
                change(e: Event) {
                    if (isSubmitFormOnChange) {
                        const target = e.target as HTMLInputElement;
                        const form = target.closest('form') as HTMLFormElement;
                        form.requestSubmit();
                    }
                },
            },
            attr: props.attr,
        });
    }

    render() {
        return `<input
                    value='{{value}}'
                    type='{{type}}'
                    name='{{id}}'
                    id='{{id}}'
                    placeholder='{{placeholder}}'
                    {{#if disabled}}
                        disabled
                    {{/if}}
                    {{#if accept}}
                        accept='{{accept}}'
                    {{/if}}
                />`;
    }
}
