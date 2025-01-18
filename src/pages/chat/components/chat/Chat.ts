import { Block, BlockProps, connect } from '../../../../framework';
import { AppStoreType } from '../../../../store';
import { ChatHeader } from '../chat-header';
import { ChatMessageBox } from '../chat-message-box';
import { ChatMessages } from '../chat-messages';

interface Props extends BlockProps {
    id?: number;
}

class ChatBlock extends Block {
    constructor(props: Props) {
        super({
            ...props,
            ChatHeader: new ChatHeader({
                isPopupOpen: false,
                isActionsOpen: false,
            }),
            ChatMessages: new ChatMessages({}),
            ChatMessageBox: new ChatMessageBox({}),
        });
    }

    render() {
        return `<section class='chat'>
                    {{#if id}}
                        {{{ChatHeader}}}
                        {{{ChatMessages}}}
                        {{{ChatMessageBox}}}
                    {{else}}
                        <div class='chat__empty_chat'>Выберите чат чтобы отправить сообщение</div>
                    {{/if}}
                </section>`;
    }
}

export const Chat = connect<AppStoreType>((state) => ({
    ...state.currentChat,
}))(ChatBlock);
