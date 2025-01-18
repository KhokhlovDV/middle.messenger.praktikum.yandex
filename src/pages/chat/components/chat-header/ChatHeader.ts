import { chatController } from '../../../../controllers';
import { Block, BlockProps, connect } from '../../../../framework';
import { AppStoreType } from '../../../../store';
import { helper } from '../../../../utils';
import { Avatar } from '../avatar';
import { PopupWindow } from '../popup-window';
import { Actions, ActionType } from './actions';
import { More } from './more';

interface Props extends BlockProps {
    id?: number;
    title?: string;
    avatar?: string;
    users?: string;
    isPopupOpen: boolean;
    isActionsOpen: boolean;
}

class ChatHeaderBlock extends Block {
    private popupWindow: PopupWindow;

    private action: ActionType = ActionType.ADD_USER;

    private avatar: Avatar;

    constructor(props: Props) {
        const popupPros = ChatHeaderBlock.createPopupProps(ActionType.ADD_USER);
        const popupWindow = new PopupWindow({
            id: 'login',
            label: 'Логин',
            onClose: () => {
                this.setProps({
                    isPopupOpen: false,
                });
            },
            onFormSuccess: (form) => {
                this.onSuccessForm(form);
            },
            ...popupPros,
        });
        const avatar = new Avatar({
            className: 'avatar-sm',
            src: props.avatar ?? '',
            isChangeable: true,
            chatId: props.id,
        });
        super({
            ...props,
            PopupWindow: popupWindow,
            Avatar: avatar,
            More: new More({
                onClick: () => {
                    this.setProps({
                        isActionsOpen: true,
                    });
                },
            }),
            Actions: new Actions({
                onClose: () => {
                    this.setProps({
                        isActionsOpen: false,
                    });
                },
                onClick: (type) => {
                    this.onSelectAction(type);
                },
            }),
        });
        this.avatar = avatar;
        this.popupWindow = popupWindow;
    }

    private onSelectAction(type: ActionType) {
        switch (type) {
            case ActionType.DELETE_CHAT: {
                this.deleteChat();
                this.setProps({
                    isActionsOpen: false,
                });
                break;
            }
            default: {
                this.action = type;
                const updatedProps = ChatHeaderBlock.createPopupProps(
                    this.action
                );
                this.popupWindow.setProps({
                    ...updatedProps,
                });
                this.setProps({
                    isActionsOpen: false,
                    isPopupOpen: true,
                });
                break;
            }
        }
    }

    private onSuccessForm(form: HTMLFormElement) {
        if (this.action === ActionType.ADD_USER) {
            this.onSuccessAddUserForm(form);
        } else {
            this.onSuccessDeleteUserForm(form);
        }
    }

    private onSuccessAddUserForm(form: HTMLFormElement) {
        alert('on success add user form');
    }
    private onSuccessDeleteUserForm(form: HTMLFormElement) {
        alert('on success delete user form');
    }

    private deleteChat() {
        chatController.deleteChat({ chatId: this.props.id as number });
    }

    protected override componentDidUpdate = (
        oldProps: Props,
        newProps: Props
    ) => {
        if (
            oldProps.avatar !== newProps.avatar ||
            oldProps.id !== newProps.id
        ) {
            this.avatar.setProps({
                src: newProps.avatar,
                chatId: newProps.id,
            });
        }
        return true;
    };

    render() {
        return `<header class='chat-header'>
                    {{{Avatar}}}
                    <h3>{{title}}</h3>
                    <span>{{users}}</span>
                    {{{More}}}
                    {{#if isPopupOpen}}
                        {{{PopupWindow}}}
                    {{/if}}
                    {{#if isActionsOpen}}
                        {{{Actions}}}
                    {{/if}}
                </header>`;
    }

    static createPopupProps(type: ActionType) {
        const result =
            type === ActionType.ADD_USER
                ? {
                      buttonText: 'Добавить',
                      header: 'Добавить пользователя',
                  }
                : {
                      buttonText: 'Удалить',
                      header: 'Удалить пользователя',
                  };
        return {
            ...result,
            errorMessage: '',
            formId: helper.generateRandomId(),
        };
    }
}

export const ChatHeader = connect<AppStoreType>((state) => {
    const currentChat = state.chats.find(
        (chat) => chat.id === state.currentChat.id
    );
    return currentChat
        ? {
              id: currentChat.id,
              title: currentChat.title,
              avatar: currentChat.avatar,
              users: state.currentChat.users,
          }
        : {};
})(ChatHeaderBlock);
