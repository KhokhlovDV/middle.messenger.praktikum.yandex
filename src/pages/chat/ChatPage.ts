import { Routes } from '../../constants';
import { Block, BlockProps } from '../../framework';
import { Router } from '../../router';
import { Link } from '../../shared-components';
import { AddChat, Chat, ChatFeed } from './components';

export class ChatPage extends Block {
    constructor(props: BlockProps) {
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
            Chat: new Chat({}),
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
                    {{{Chat}}}
                </main>`;
    }
}
