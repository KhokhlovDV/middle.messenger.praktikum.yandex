import { Block, BlockProps } from '../../framework';
import { Mediator } from '../../utils/Mediator';

interface Props extends BlockProps {
    to: string;
    text: string;
    className?: string;
    mediator: Mediator;
}

export class Link extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click(e: Event) {
                    e.preventDefault();
                    const target = e.target as HTMLAnchorElement;
                    if (target.dataset?.page) {
                        props.mediator.navigateTo(target.dataset.page);
                    }
                },
            },
        });
    }

    render() {
        return `<a href='#' class='link {{className}}' data-page='{{to}}'>{{text}}</a>`;
    }
}
