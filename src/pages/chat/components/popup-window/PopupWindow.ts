import { Block, BlockProps } from '../../../../framework';
import { Form } from '../../../../shared-components/form';

interface Props extends BlockProps {
    buttonText: string;
    onFormSuccess: (form: HTMLFormElement) => void;
    header: string;
    label: string;
    id: string;
    onClose: () => void;
    errorMessage?: string;
}

export class PopupWindow extends Block {
    constructor({
        buttonText,
        onFormSuccess,
        id,
        label,
        header,
        errorMessage,
        onClose,
    }: Props) {
        super({
            header,
            errorMessage,
            events: {
                click: (e: Event) => {
                    const target = e.target as HTMLElement;
                    if (!target.closest('.popup-window__container')) {
                        onClose();
                    }
                },
            },
            Form: new Form({
                buttonClassName: 'popup-window__button',
                buttonText,
                formFields: [
                    {
                        id,
                        label,
                        type: 'text',
                    },
                ],
                onFormSuccess,
            }),
        });
    }

    render() {
        return `<div class='popup-window'>
                    <div class='modal-window popup-window__container'>
                        <div class='popup-window__header'>
                            {{header}}
                            {{#if errorMessage}}
                                <div class='popup-window__error'>{{errorMessage}}</div>
                            {{/if}}
                        </div>
                        {{{Form}}}
                    </div>
                </div>`;
    }
}
