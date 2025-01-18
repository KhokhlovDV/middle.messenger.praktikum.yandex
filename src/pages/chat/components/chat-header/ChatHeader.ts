import { Block, BlockProps, connect } from '../../../../framework';
import { AppStoreType } from '../../../../store';
import { Avatar } from '../avatar';
import { MoreModals } from './more-modals';

interface Props extends BlockProps {
    id?: number;
    title?: string;
    avatar?: string;
    users?: string;
}

class ChatHeaderBlock extends Block {
    private avatar: Avatar;

    constructor(props: Props) {
        const avatar = new Avatar({
            className: 'avatar-sm',
            src: props.avatar ?? '',
            isChangeable: true,
            chatId: props.id,
        });
        super({
            ...props,
            Avatar: avatar,
            MoreModals: new MoreModals({
                isActionsOpen: false,
                isPopupOpen: false,
            }),
        });
        this.avatar = avatar;
    }

    protected override componentDidUpdate = (
        oldProps: Props,
        newProps: Props
    ) => {
        if (
            oldProps.avatar !== newProps.avatar ||
            oldProps.id !== newProps.id
        ) {
            this.avatar.setProps({
                src: newProps.avatar,
                chatId: newProps.id,
            });
        }
        return true;
    };

    render() {
        return `<header class='chat-header'>
                    {{{Avatar}}}
                    <h3>{{title}}</h3>
                    <span>{{users}}</span>
                    {{{MoreModals}}}
                </header>`;
    }
}

export const ChatHeader = connect<AppStoreType>((state) => {
    const currentChat = state.chats.find(
        (chat) => chat.id === state.currentChat.id
    );
    return currentChat
        ? {
              id: currentChat.id,
              title: currentChat.title,
              avatar: currentChat.avatar,
              users: state.currentChat.users,
          }
        : {};
})(ChatHeaderBlock);
