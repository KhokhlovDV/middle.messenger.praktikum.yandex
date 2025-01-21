import { Block, BlockProps } from '../../../../../framework';

interface Props extends BlockProps {
    onClick: () => void;
}
export class More extends Block {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                click: props.onClick,
            },
        });
    }

    render() {
        return `<span class='more'>
                        <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E"/>
                            <circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E"/>
                            <circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E"/>
                        </svg>
                </span>`;
    }
}
