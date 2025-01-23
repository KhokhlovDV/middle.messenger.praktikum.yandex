import { Block, BlockProps } from '../../framework';

interface Props extends BlockProps {
    text: string;
    className?: string;
    type?: string;
    onClick?: () => void;
}

export class Button extends Block {
    constructor(props: Props) {
        const { onClick, ...other } = props;
        super({
            ...other,
            events: {
                click(e: Event) {
                    if (onClick) {
                        e.preventDefault();
                        onClick();
                    }
                },
            },
        });
    }

    render() {
        return `<button 
                    {{#if type}} type='{{type}}' {{/if}} 
                    class='button {{className}}'>
                    {{text}}
                </button>`;
    }
}
