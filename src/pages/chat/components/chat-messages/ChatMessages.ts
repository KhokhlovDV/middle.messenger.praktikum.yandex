import { Block, BlockProps } from '../../../../framework';

interface Props extends BlockProps {}

export class ChatMessages extends Block {
    constructor(props: Props) {
        super({
            ...props,
        });
    }

    render() {
        return `<ul class='chat-messages'>
                    {{{ChatMessages}}}
                </ul>`;
    }
}
