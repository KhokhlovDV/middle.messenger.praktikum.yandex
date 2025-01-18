import { chatController } from '../../../../../controllers';
import { Block, BlockProps, connect } from '../../../../../framework';
import { AppStoreType } from '../../../../../store';
import { helper } from '../../../../../utils';
import { PopupWindow } from '../../popup-window';
import { Actions, ActionType } from '../actions';
import { More } from '../more';

interface Props extends BlockProps {
    isPopupOpen: boolean;
    isActionsOpen: boolean;
    id?: number;
}
class MoreModalsBlock extends Block {
    private popupWindow: PopupWindow;

    private action: ActionType = ActionType.ADD_USER;

    constructor(props: Props) {
        const popupPros = MoreModalsBlock.createPopupProps(ActionType.ADD_USER);
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
        super({
            ...props,
            PopupWindow: popupWindow,
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
                const updatedProps = MoreModalsBlock.createPopupProps(
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

    render() {
        return `<div class='more-modals'>
                    {{{More}}}
                    {{#if isPopupOpen}}
                        {{{PopupWindow}}}
                    {{/if}}
                    {{#if isActionsOpen}}
                        {{{Actions}}}
                    {{/if}}
                </div>`;
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

export const MoreModals = connect<AppStoreType>((state) => ({
    id: state.currentChat.id,
}))(MoreModalsBlock);
