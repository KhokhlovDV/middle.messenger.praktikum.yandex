import { Block, BlockProps } from '../../framework';

interface Props extends BlockProps {
    text: string;
    onLinkClick: () => void;
    className?: string;
    attr?: Record<string, string>;
}

export class Link extends Block {
    constructor(props: Props) {
        super({
            to: props.to,
            text: props.text,
            className: props.className,
            events: {
                click(e: Event) {
                    e.preventDefault();
                    props.onLinkClick();
                },
            },
        });
    }

    render() {
        return `<a href='#' class='link {{className}}'>{{text}}</a>`;
    }
}
