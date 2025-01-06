import { Block, BlockProps } from '../../framework';

interface Props extends BlockProps {
    text: string;
    className?: string;
    type?: string;
}

export class Button extends Block {
    constructor(props: Props) {
        super({
            ...props,
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
