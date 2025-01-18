import { chatController } from '../../../../controllers';
import { Block, BlockProps, connect } from '../../../../framework';
import { AppStoreType, ChatData } from '../../../../store';
import { ChatFeedItem } from '../chat-feed-item';

interface Props extends BlockProps {
    chats: {
        chatData: ChatData[];
    };
}

class ChatFeedBlock extends Block {
    private chatItems: Map<number, ChatFeedItem> = new Map();

    constructor(props: Props) {
        const chatItems = ChatFeedBlock.createChatItems(
            props.chats.chatData,
            (chatId) => {
                this.onChatClick(chatId);
            }
        );
        super({
            ...props,
            ChatFeedItems: props.chats.chatData.map(
                (chat) => chatItems.get(chat.id)!
            ),
        });
        this.chatItems = chatItems;
    }

    protected override componentDidMount = () => {
        chatController.get();
    };

    protected override componentDidUpdate = (_: Props, newProps: Props) => {
        if (newProps.chats) {
            this.chatItems = ChatFeedBlock.createChatItems(
                newProps.chats.chatData,
                (chatId) => {
                    this.onChatClick(chatId);
                },
                this.chatItems
            );
            this.setLists({
                ChatFeedItems: newProps.chats.chatData.map(
                    (chat) => this.chatItems.get(chat.id)!
                ),
            });
            return false;
        }
        return true;
    };

    private onChatClick(chatId: number) {
        chatController.setCurrent(chatId);
    }

    render() {
        return `<ul class='chat-feed'>{{{ChatFeedItems}}}</ul>`;
    }

    static createChatItems(
        chats: ChatData[],
        onClick: (chatId: number) => void,
        chatsMap?: Map<number, ChatFeedItem>
    ) {
        const result = chatsMap ?? new Map<number, ChatFeedItem>();
        const chatsIds = chats.map((chat) => chat.id);
        const deletedIds = [...result.keys()].filter(
            (key) => !chatsIds.includes(key)
        );
        deletedIds.forEach((id) => result.delete(id));
        chats.forEach((chat) => {
            if (result.has(chat.id)) {
                const item = result.get(chat.id)!;
                item.setProps({
                    ...chat,
                    onClick,
                });
            } else {
                result.set(
                    chat.id,
                    new ChatFeedItem({
                        ...chat,
                        onClick,
                    })
                );
            }
        });
        return result;
    }
}

export const ChatFeed = connect<AppStoreType>((state) => ({
    chats: {
        chatData: state.chats,
    },
}))(ChatFeedBlock);
