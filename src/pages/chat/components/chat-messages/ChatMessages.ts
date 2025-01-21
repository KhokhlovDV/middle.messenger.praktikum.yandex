import { Block, BlockProps, connect } from '../../../../framework';
import { AppStoreType } from '../../../../store';
import { ChatMessage } from '../chat-message';

interface Props extends BlockProps {
    chatData: {
        messages: {
            isMyMessage: boolean;
            id: number;
            time: string;
            content: string;
            path: string;
        }[];
    };
}

class ChatMessagesBlock extends Block {
    private items: { id: number; message: ChatMessage }[] = [];

    constructor(props: Props) {
        super({
            ...props,
        });
    }

    protected override componentDidUpdate = (_: Props, newProps: Props) => {
        if (newProps.chatData) {
            const { messages } = newProps.chatData;
            this.items = this.items.filter((item) =>
                messages.find((chat) => chat.id === item.id)
            );
            const newMessages = messages
                .filter(
                    (chat) => !this.items.find((item) => item.id === chat.id)
                )
                .map((newMessage) => ({
                    id: newMessage.id,
                    message: new ChatMessage({
                        ...newMessage,
                    }),
                }));
            this.items = [...newMessages, ...this.items];
            this.setLists({
                ChatMessages: this.items.map((item) => item.message),
            });
            return true;
        }
        return false;
    };

    render() {
        return `<ul class='chat-messages'>
                    {{{ChatMessages}}}
                </ul>`;
    }
}

export const ChatMessages = connect<AppStoreType>((state) => {
    const chatId = state.currentChat.id;
    const userId = state.user?.id;
    const messages =
        state.chatsMessages.find((el) => el.id === chatId)?.messages ?? [];
    return {
        chatData: {
            messages: messages.map((message) => ({
                ...message,
                isMyMessage: message.user_id === userId,
            })),
        },
    };
})(ChatMessagesBlock);
