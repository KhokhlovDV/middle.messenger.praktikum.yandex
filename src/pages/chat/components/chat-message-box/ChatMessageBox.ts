import { Block, BlockProps } from '../../../../framework';
import { MessageForm } from '../message-form';

export class ChatMessageBox extends Block {
    constructor(props: BlockProps) {
        super({});
    }

    render() {
        return `<footer class='chat-message-box'>
                    <button class='chat-message-box__attach'>
                        <img src="/attach.svg" alt="attach">
                    </button>
                </footer>`;
    }
}
