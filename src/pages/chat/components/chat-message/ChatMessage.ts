import { Block, BlockProps } from '../../../../framework';
import { ChatMessageType } from '../../../../utils/Store';

interface Props extends BlockProps {
    message: ChatMessageType;
}

export class ChatMessage extends Block {
    constructor(props: Props) {
        super({
            ...props.message,
        });
    }

    render() {
        return `<div {{#if myMessage}} class='chat-message chat-message-my' {{else}} class='chat-message chat-message-opponent'{{/if}}>
                    {{messageText}}
                    <div class="chat-message__time">{{messageTime}}</div>
                </div>
                `;
    }
}
