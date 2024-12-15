import Block, { BlockProps } from '../../framework/Block';
import { Link } from '../../shared-components/link';
import { helper } from '../../utils/helper';
import { Mediator } from '../../utils/Mediator';
import { AppData } from '../../utils/Store';
import { ChatFeed } from './components/chat-feed';
import { ChatHeader } from './components/chat-header';
import { ChatMessageBox } from './components/chat-message-box';
import { ChatMessages } from './components/chat-messages';
import { SearchForm } from './components/search-form';

interface Props extends BlockProps {
    mediator: Mediator;
}

export class ChatPage extends Block {
    constructor(props: Props) {
        const appData = props.mediator.getAppData() as AppData;
        const {
            chats,
            currentChat: { chatInfo, messages },
        } = appData;
        super({
            ProfileLink: new Link({
                mediator: props.mediator,
                text: 'Профиль',
                to: '/profile-info',
                classNames: 'link-secondary link-m',
            }),
            SearchForm: new SearchForm({
                onSubmit: (data) => {
                    helper.consoleFormData(data);
                },
            }),
            ChatFeed: new ChatFeed({
                chats,
                onClick(chatId) {
                    console.log(`click on chat ${chatId}`);
                },
            }),
            ChatHeader: new ChatHeader({
                chatInfo,
            }),
            ChatMessages: new ChatMessages({
                messages,
            }),
            ChatMessageBox: new ChatMessageBox({
                mediator: props.mediator,
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
                        {{{SearchForm}}}
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
