import Block from '../../framework/Block';

interface Props {
    id: string;
    disabled?: boolean;
    type?: string;
    value?: string;
    placeholder?: string;
    onBlur?: (target: HTMLInputElement) => void;
    attr?: Record<string, string>;
}

export class Input extends Block {
    constructor(props: Props) {
        const { onBlur, ...other } = props;
        super({
            ...other,
            events: {
                blur(e: Event) {
                    if (onBlur && e.target instanceof HTMLInputElement) {
                        onBlur(e.target);
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
                />`;
    }
}
