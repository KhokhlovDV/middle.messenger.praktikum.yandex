import { Block, BlockProps } from '../../../../../framework';

interface Props extends BlockProps {
    onClick: () => void;
    imageSrc: string;
    text: string;
}
export class ActionItem extends Block {
    constructor(props: Props) {
        const { onClick, ...other } = props;
        super({
            ...other,
            events: {
                click: props.onClick,
            },
        });
    }

    render() {
        return `<div class="action-item">
            <img class="action-item__img" src="{{imageSrc}}" alt="more">
            <div class="action-item__text">{{text}}</div>
        <div>`;
    }
}
