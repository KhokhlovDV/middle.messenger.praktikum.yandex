import Block, { BlockProps } from '../../framework/Block';

interface Props extends BlockProps {
    src: string;
    type?: string;
    onClick?: () => void;
}

export class RoundedButton extends Block {
    constructor(props: Props) {
        const { onClick, ...other } = props;
        super({
            ...other,
            events: {
                click: () => {
                    if (onClick) {
                        onClick();
                    }
                },
            },
        });
    }

    render() {
        return `<button 
                    class='rounded-button'     
                    {{#if type}} type='{{type}}' {{/if}} >
                    <img src='{{src}}' alt="arrow"/>
                </button>`;
    }
}
