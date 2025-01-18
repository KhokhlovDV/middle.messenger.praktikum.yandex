import { Block, BlockProps } from '../../../../framework';
import { Attach, MessageForm } from './components';

export class ChatMessageBox extends Block {
    constructor(props: BlockProps) {
        super({
            ...props,
            Attach: new Attach({}),
            MessageForm: new MessageForm({}),
        });
    }

    render() {
        return `<footer class='chat-message-box'>
                    {{{Attach}}}
                    {{{MessageForm}}}
                </footer>`;
    }
}
