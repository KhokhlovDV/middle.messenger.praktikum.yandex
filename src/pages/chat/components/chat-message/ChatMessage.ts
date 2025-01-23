import { RESOURCES } from '../../../../constants';
import { Block, BlockProps } from '../../../../framework';

interface Props extends BlockProps {
    isMyMessage: boolean;
    id: number;
    time: string;
    content: string;
    path: string;
}

export class ChatMessage extends Block {
    constructor(props: Props) {
        super({
            host: RESOURCES,
            ...props,
        });
    }

    render() {
        return `<div {{#if isMyMessage}} class='chat-message chat-message-my' {{else}} class='chat-message chat-message-opponent'{{/if}}>
                    {{#if path}}
                        <img src='{{host}}{{path}}' class='chat-message__image' alt='image' />
                    {{else}}
                        {{content}}
                    {{/if}}
                    <div class="chat-message__time">{{time}}</div>
                </div>
                `;
    }
}
