import Block, { BlockProps } from '../../../../framework/Block';

interface Props extends BlockProps {
    src: string;
    className: string;
}

export class Avatar extends Block {
    constructor(props: Props) {
        super({
            ...props,
        });
    }

    render() {
        return `{{#if src}}
                    <img src='{{src}}' class='avatar {{className}}' alt='avatar' />
                {{else}}
                    <div class='avatar {{className}}'></div>
                {{/if}}`;
    }
}
