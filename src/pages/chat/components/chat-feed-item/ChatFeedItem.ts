import { Block, BlockProps } from '../../../../framework';
import { ChatData } from '../../../../store/Store';
import { Avatar } from '../avatar';

interface Props extends BlockProps, ChatData {
    onClick: (chatId: number) => void;
}

export class ChatFeedItem extends Block {
    private avatar: Avatar;

    constructor(props: Props) {
        const avatar = new Avatar({
            className: 'avatar-m chat-feed-item__avatar',
            src: props.avatar,
        });
        super({
            ...props,
            Avatar: avatar,
            events: {
                click: () => {
                    props.onClick(props.id);
                },
            },
        });
        this.avatar = avatar;
    }

    protected override componentDidUpdate = (
        oldProps: Props,
        newProps: Props
    ) => {
        if (oldProps.avatar !== newProps.avatar) {
            this.avatar.setProps({
                src: newProps.avatar,
            });
        }
        return true;
    };

    render() {
        return `<li class='chat-feed-item'>
                    {{{Avatar}}}
                    <div class='chat-feed-item__text-container'>
                        <div class="chat-feed-item__user-name">{{title}}</div>
                        <div class="chat-feed-item__message-container">
                            {{last_message_content}}
                        </div>
                    </div>
                    <div class='chat-feed-item__info-container'>
                        <span class='chat-feed-item__time'>{{last_message_time}}</span>
                        {{#if unread_count}}
                            <span class='chat-feed-item__badge'>{{unread_count}}</span>
                        {{/if}}
                        
                    </div>
                </li>`;
    }
}
