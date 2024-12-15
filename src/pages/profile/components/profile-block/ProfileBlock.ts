import Block, { BlockProps } from '../../../../framework/Block';

interface Props extends BlockProps {
    content: Block[];
    className?: string;
}

export class ProfileBlock extends Block {
    constructor(props: Props) {
        super({
            className: props.className,
            Content: props.content,
        });
    }

    render() {
        return `<div class="profile-block {{className}}">
                    {{{Content}}}
                </div>`;
    }
}
