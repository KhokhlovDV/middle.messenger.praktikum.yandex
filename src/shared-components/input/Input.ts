import Block from '../../framework/Block';

interface Props {
    id: string;
    type?: string;
    value?: string;
    className?: string;
    onBlur?: (target: HTMLInputElement) => void;
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
        });
    }

    render() {
        return `<input
                    class='{{className}}'
                    value='{{value}}'
                    type='{{type}}'
                    name='{{id}}'
                    id='{{id}}'
                />`;
    }
}
