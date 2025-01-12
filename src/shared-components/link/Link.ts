import { LinkController } from '../../controllers';
import { Block, BlockProps } from '../../framework';
import { helper } from '../../utils/helper';

interface Props extends BlockProps {
    to: string;
    text: string;
    disabled?: boolean;
    attr?: Record<string, string>;
}

export class Link extends Block {
    constructor(props: Props) {
        const defaultClass = helper.classnames(
            'link',
            props.disabled ? 'link-disabled' : '',
            props.attr?.class ?? ''
        );
        super({
            to: props.to,
            text: props.text,
            events: {
                click(e: Event) {
                    e.preventDefault();
                    const target = e.target as HTMLAnchorElement;
                    if (target.dataset?.page) {
                        LinkController.navigate(target.dataset?.page);
                    }
                },
            },
            attr: {
                ...props.attr,
                class: defaultClass,
            },
        });
    }

    render() {
        return `<a href='#' data-page='{{to}}'>{{text}}</a>`;
    }
}
