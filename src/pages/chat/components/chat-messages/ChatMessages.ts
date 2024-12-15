import Block, { BlockProps } from '../../../../framework/Block';
import { ChatMessageType } from '../../../../utils/Store';
import { ChatMessage } from '../chat-message';

interface Props extends BlockProps {
    messages: ChatMessageType[];
}

export class ChatMessages extends Block {
    constructor(props: Props) {
        super({
            ChatMessages: props.messages.map(
                (message) =>
                    new ChatMessage({
                        message,
                    })
            ),
        });
    }

    render() {
        return `<ul class='chat-messages'>
                    {{{ChatMessages}}}
                </ul>`;
    }
}
