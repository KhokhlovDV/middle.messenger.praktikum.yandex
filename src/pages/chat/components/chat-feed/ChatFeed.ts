import { Block, BlockProps } from '../../../../framework';
import { Chat } from '../../../../utils/Store';
import { ChatFeedItem } from '../chat-feed-item';

interface Props extends BlockProps {
    chats: Chat[];
    onClick: (chatId: string) => void;
}

export class ChatFeed extends Block {
    constructor(props: Props) {
        super({
            ChatFeedItems: props.chats.map(
                (chat) =>
                    new ChatFeedItem({
                        chat,
                        onClick: (chatId) => {
                            props.onClick(chatId);
                        },
                    })
            ),
        });
    }

    render() {
        return `<ul class='chat-feed'>{{{ChatFeedItems}}}</ul>`;
    }
}
