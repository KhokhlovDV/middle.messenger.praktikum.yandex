import Block, { BlockProps } from '../../../../framework/Block';
import { Mediator } from '../../../../utils/Mediator';
import { MessageForm } from '../message-form';

interface Props extends BlockProps {
    mediator: Mediator;
}

export class ChatMessageBox extends Block {
    constructor(props: Props) {
        super({
            MessageForm: new MessageForm({
                mediator: props.mediator,
            }),
        });
    }

    render() {
        return `<footer class='chat-message-box'>
                    <button class='chat-message-box__attach'>
                        <img src="/attach.svg" alt="attach">
                    </button>
                    {{{MessageForm}}}
                </footer>`;
    }
}
