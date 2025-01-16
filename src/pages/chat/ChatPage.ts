import { Routes } from '../../constants';
import { Block } from '../../framework';
import { Router } from '../../router';
import { Link } from '../../shared-components';
import { ChatFeed } from './components';
import { AddChat } from './components/add-chat';

export class ChatPage extends Block {
    constructor() {
        super({
            ProfileLink: new Link({
                text: 'Профиль',
                className: 'link-secondary link-m',
                onLinkClick: () => {
                    Router.getInstance().go(Routes.Settings);
                },
            }),
            AddChat: new AddChat({}),
            ChatFeed: new ChatFeed({
                chats: [],
                onClick(chatId) {
                    console.log(`click on chat ${chatId}`);
                },
            }),
        });
    }

    render() {
        return `<main class='chat-layout'>
                    <aside class='chat-layout__side-content'>
                        <div class="chat-layout__profile">
                            {{{ProfileLink}}}
                            <img src="/navigate.svg" alt="navigate">
                        </div>
                        {{{AddChat}}}
                        <div class="chat-layout__chats_feed">
                            {{{ChatFeed}}}
                        </div>
                    </aside>
                    <section class='chat-layout__chat'>
                        {{{ChatHeader}}}
                        {{{ChatMessages}}}
                        {{{ChatMessageBox}}}
                    </section>
                </main>`;
    }
}
