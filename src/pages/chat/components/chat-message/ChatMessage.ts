import { Block, BlockProps } from '../../../../framework';

interface Props extends BlockProps {}

export class ChatMessage extends Block {
    constructor(props: Props) {
        super({
            ...props,
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
