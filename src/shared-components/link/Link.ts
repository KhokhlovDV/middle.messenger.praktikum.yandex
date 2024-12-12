import Block from '../../framework/Block';

type Props = {
    to: string;
    text: string;
    onLinkClick: (to: string) => void;
    classNames?: string;
};

export class Link extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click(e: Event) {
                    e.preventDefault();
                    const target = e.target as HTMLAnchorElement;
                    if (target.dataset?.page) {
                        props.onLinkClick(target.dataset.page);
                    }
                },
            },
        });
    }

    render() {
        return `<a href='#' class='link {{classNames}}' data-page='{{to}}'>{{text}}</a>`;
    }
}
