import { Block, BlockProps } from '../../../../framework';
import { ChatMessageType } from '../../../../utils/Store';
import { ChatMessage } from '../chat-message';

interface Props extends BlockProps {}

export class ChatMessages extends Block {
    constructor(props: Props) {
        super({});
    }

    render() {
        return `<ul class='chat-messages'>
                    {{{ChatMessages}}}
                </ul>`;
    }
}
