import { Block, BlockProps } from '../../../../../framework';
import { ActionItem } from '../action-item';

export enum ActionType {
    ADD_USER,
    DELETE_USER,
    DELETE_CHAT,
}

interface Props extends BlockProps {
    onClick: (type: ActionType) => void;
    onClose: () => void;
}
export class Actions extends Block {
    constructor(props: Props) {
        super({
            events: {
                click: (e) => {
                    const target = e.target as HTMLElement;
                    if (!target.closest('.actions__container')) {
                        props.onClose();
                    }
                },
            },
            ActionItems: [
                new ActionItem({
                    text: 'Добавить пользователя',
                    imageSrc: '/add_user.svg',
                    onClick: () => {
                        props.onClick(ActionType.ADD_USER);
                    },
                }),
                new ActionItem({
                    text: 'Удалить пользователя',
                    imageSrc: '/delete_user.svg',
                    onClick: () => {
                        props.onClick(ActionType.DELETE_USER);
                    },
                }),
                new ActionItem({
                    text: 'Удалить чат',
                    imageSrc: '/delete_chat.svg',
                    onClick: () => {
                        props.onClick(ActionType.DELETE_CHAT);
                    },
                }),
            ],
        });
    }

    render() {
        return `<div class="actions">
                    <div class="actions__container">{{{ActionItems}}}</div>         
                </div>`;
    }
}
