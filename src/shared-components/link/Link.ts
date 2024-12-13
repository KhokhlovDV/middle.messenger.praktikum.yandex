import Block from '../../framework/Block';
import { Mediator } from '../../utils/Mediator';

type Props = {
    to: string;
    text: string;
    classNames?: string;
};

export class Link extends Block {
    constructor(props: Props, mediator: Mediator) {
        super({
            ...props,
            events: {
                click(e: Event) {
                    e.preventDefault();
                    const target = e.target as HTMLAnchorElement;
                    if (target.dataset?.page) {
                        mediator.navigateTo(target.dataset?.page);
                    }
                },
            },
        });
    }

    render() {
        return `<a href='#' class='link {{classNames}}' data-page='{{to}}'>{{text}}</a>`;
    }
}
