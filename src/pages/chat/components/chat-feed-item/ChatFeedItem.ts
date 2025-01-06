import { Block, BlockProps } from '../../../../framework';
import { Chat } from '../../../../utils/Store';
import { Avatar } from '../avatar';

interface Props extends BlockProps {
    chat: Chat;
    onClick: (chatId: string) => void;
}

export class ChatFeedItem extends Block {
    constructor(props: Props) {
        const { avatar, ...other } = props.chat;
        super({
            ...other,
            Avatar: new Avatar({
                className: 'avatar-m chat-feed-item__avatar',
                src: avatar,
            }),
            events: {
                click: () => {
                    props.onClick(other.id);
                },
            },
        });
    }

    render() {
        return `<li class='chat-feed-item'>
                    {{{Avatar}}}
                    <div class='chat-feed-item__text-container'>
                        <div class="chat-feed-item__user-name">{{userName}}</div>
                        <div class="chat-feed-item__message-container">
                            {{#if myMessage}}
                                <span class="chat-feed-item__my-message">Вы:</span>
                            {{/if}}
                            {{lastMessage}}
                        </div>
                    </div>
                    <div class='chat-feed-item__info-container'>
                        <span class='chat-feed-item__time'>{{messageTime}}</span>
                        {{#if unreadMessagesCount}}
                            <span class='chat-feed-item__badge'>{{unreadMessagesCount}}</span>
                        {{/if}}
                        
                    </div>
                </li>`;
    }
}
