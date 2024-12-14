import Block, { BlockProps } from '../../framework/Block';
import { Link } from '../../shared-components/link';
import { helper } from '../../utils/helper';
import { Mediator } from '../../utils/Mediator';
import { AppData } from '../../utils/Store';
import { ChatFeed } from './components/chat-feed';
import { SearchForm } from './components/search-form';

interface Props extends BlockProps {
    mediator: Mediator;
}

export class ChatPage extends Block {
    constructor(props: Props) {
        const appData = props.mediator.getAppData() as AppData;
        super({
            ProfileLink: new Link({
                mediator: props.mediator,
                text: 'Профиль',
                to: '/profile',
                classNames: 'link-secondary link-m',
            }),
            SearchForm: new SearchForm({
                onSubmit: (data) => {
                    helper.consoleFormData(data);
                },
            }),
            ChatFeed: new ChatFeed({
                chats: appData.chatData.chats,
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
                        {{{SearchForm}}}
                        <div class="chat-layout__chats_feed">
                            {{{ChatFeed}}}
                        </div>
                    </aside>
                    <section class='chat-layout__chat'>
                    </section>
                </main>`;
    }
}

//     <section class='chat-layout__chat'>
//         <div class="chat">
//             {{> ChatHeader avatar=avatar name=name}}
//             {{> ChatMessages messages=messages}}
//             {{> ChatMyMessageBox message=message}}
//         </div>
//     </section>
