import Block, { BlockProps } from '../../../../framework/Block';
import { CurrentChatInfoType } from '../../../../utils/Store';
import { Avatar } from '../avatar';

interface Props extends BlockProps {
    chatInfo: CurrentChatInfoType;
}

export class ChatHeader extends Block {
    constructor(props: Props) {
        const { avatar, name } = props.chatInfo;
        super({
            name,
            Avatar: new Avatar({
                className: 'avatar-sm',
                src: avatar,
            }),
        });
    }

    render() {
        return `<header class='chat-header'>
                    {{{Avatar}}}
                    <h3>{{name}}</h3>
                    <img class="chat-header__more" src="/more.svg" alt="more">
                </header>`;
    }
}
