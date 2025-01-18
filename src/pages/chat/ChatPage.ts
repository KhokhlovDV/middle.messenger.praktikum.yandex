import { Routes } from '../../constants';
import { Block, BlockProps, connect } from '../../framework';
import { Router } from '../../router';
import { Link } from '../../shared-components';
import { AppStoreType } from '../../store';
import {
    ChatFeed,
    ChatHeader,
    ChatMessageBox,
    ChatMessages,
} from './components';
import { AddChat } from './components/add-chat';

interface Props extends BlockProps {
    id?: number;
}

class Chat extends Block {
    constructor(props: Props) {
        super({
            ...props,
            ProfileLink: new Link({
                text: 'Профиль',
                className: 'link-secondary link-m',
                onLinkClick: () => {
                    Router.getInstance().go(Routes.Settings);
                },
            }),
            AddChat: new AddChat({}),
            ChatFeed: new ChatFeed({}),
            ChatHeader: new ChatHeader({
                isPopupOpen: false,
                isActionsOpen: false,
            }),
            ChatMessages: new ChatMessages({}),
            ChatMessageBox: new ChatMessageBox({}),
        });
    }

    render() {
        return `<main class='chat-layout'>
                    <aside class='chat-layout__side-content'>
                        <div class="chat-layout__profile">
                            {{{ProfileLink}}}
                        </div>
                        {{{AddChat}}}
                        <div class="chat-layout__chats_feed">
                            {{{ChatFeed}}}
                        </div>
                    </aside>
                    <section class='chat-layout__chat'>
                        {{#if id}}
                            {{{ChatHeader}}}
                            {{{ChatMessages}}}
                            {{{ChatMessageBox}}}
                        {{else}}
                            <div class='chat-layout__empty_chat'>Выберите чат чтобы отправить сообщение</div>
                        {{/if}}
                    </section>
                </main>`;
    }
}

export const ChatPage = connect<AppStoreType>((state) => ({
    ...state.currentChat,
}))(Chat);
