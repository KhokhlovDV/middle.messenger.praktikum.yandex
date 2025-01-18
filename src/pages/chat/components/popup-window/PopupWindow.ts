import { Block, BlockProps } from '../../../../framework';
import { Form } from '../../../../shared-components/form';

interface Props extends BlockProps {
    onClose: () => void;
    onFormSuccess: (form: HTMLFormElement) => void;
    buttonText: string;
    header: string;
    label: string;
    id: string;
    errorMessage?: string;
    formId: number;
}

export class PopupWindow extends Block {
    private form: Form;

    constructor(props: Props) {
        const { onClose, onFormSuccess, ...other } = props;
        const form = new Form({
            formId: other.formId,
            buttonClassName: 'popup-window__button',
            buttonText: other.buttonText,
            formFields: [
                {
                    id: other.id,
                    label: other.label,
                    type: 'text',
                },
            ],
            onFormSuccess,
        });
        super({
            ...other,
            events: {
                click: (e: Event) => {
                    const target = e.target as HTMLElement;
                    if (!target.closest('.popup-window__container')) {
                        onClose();
                    }
                },
            },
            Form: form,
        });
        this.form = form;
    }

    protected override componentDidUpdate = (
        oldProps: Props,
        newProps: Props
    ) => {
        if (oldProps.buttonText !== newProps.buttonText) {
            this.form.setProps({
                buttonText: newProps.buttonText,
            });
        }
        if (oldProps.formId !== newProps.formId) {
            this.form.setProps({
                formId: newProps.formId,
            });
        }
        return true;
    };

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
