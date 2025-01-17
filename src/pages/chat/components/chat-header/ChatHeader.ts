import { Block, BlockProps } from '../../../../framework';
import { CurrentChatInfoType } from '../../../../utils/Store';

interface Props extends BlockProps {
    chatInfo: CurrentChatInfoType;
}

export class ChatHeader extends Block {
    constructor(props: Props) {
        const { name } = props.chatInfo;
        super({
            name,
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
