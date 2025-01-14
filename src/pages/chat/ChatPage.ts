import { Routes } from '../../constants';
import { Block } from '../../framework';
import { Router } from '../../router';
import { Link } from '../../shared-components';
import { helper } from '../../utils/helper';
import {
    ChatFeed,
    ChatHeader,
    ChatMessageBox,
    ChatMessages,
    SearchForm,
} from './components';

export class ChatPage extends Block {
    constructor() {
        // const {
        //     chats,
        //     currentChat: { chatInfo, messages },
        // } = appData;
        super({
            ProfileLink: new Link({
                text: 'Профиль',
                className: 'link-secondary link-m',
                onLinkClick: () => {
                    //Router.getInstance().go(Routes.Settings);
                    Router.getInstance().go(Routes.ProfileInfo);
                },
            }),
            SearchForm: new SearchForm({
                onSubmit: (data) => {
                    //helper.consoleFormData(data);
                },
            }),
            ChatFeed: new ChatFeed({
                chats: [],
                onClick(chatId) {
                    console.log(`click on chat ${chatId}`);
                },
            }),
            // ChatHeader: new ChatHeader({
            //     chatInfo,
            // }),
            // ChatMessages: new ChatMessages({
            //     messages,
            // }),
            // ChatMessageBox: new ChatMessageBox({
            //     mediator: props.mediator,
            // }),
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
