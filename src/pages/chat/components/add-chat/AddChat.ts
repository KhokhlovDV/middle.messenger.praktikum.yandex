import { chatController } from '../../../../controllers';
import { Block, BlockProps } from '../../../../framework';
import { Button } from '../../../../shared-components';
import { helper } from '../../../../utils/helper';
import { PopupWindow } from '../popup-window';

interface Form extends Record<string, string> {
    title: string;
}

interface Props extends BlockProps {
    isPopupOpen?: boolean;
}

export class AddChat extends Block {
    private popupWindow?: PopupWindow;

    constructor({ isPopupOpen = false }: Props) {
        super({
            isPopupOpen,
            Button: new Button({
                text: 'Добавить чат',
                className: 'add-chat__button',
                onClick: () => {
                    this.createPopup();
                },
            }),
        });
    }

    private createPopup() {
        this.popupWindow = new PopupWindow({
            buttonText: 'Создать',
            header: 'Создать чат',
            id: 'title',
            label: 'Наименование чата',
            onFormSuccess: (form) => {
                this.onSuccessForm(form);
            },
            onClose: () => {
                this.closePopup();
            },
        });
        this.children['PopupWindow'] = this.popupWindow;
        this.setProps({
            isPopupOpen: true,
        });
    }

    private closePopup() {
        this.setProps({
            isPopupOpen: false,
        });
    }

    private onSuccessForm(form: HTMLFormElement) {
        const result = helper.convertFormToObject<Form>(form);
        chatController
            .createChat(result)
            .then(() => {
                this.closePopup();
            })
            .catch((e: Error) => {
                this.popupWindow?.setProps({
                    errorMessage: e.message,
                });
            });
    }

    render() {
        return `<div>
                {{{Button}}}
                {{#if isPopupOpen}}
                    {{{PopupWindow}}}
                {{/if}}
                </div>`;
    }
}
