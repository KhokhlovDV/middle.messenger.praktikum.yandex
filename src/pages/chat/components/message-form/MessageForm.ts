import Block, { BlockProps } from '../../../../framework/Block';
import { Input } from '../../../../shared-components/input';
import { RoundedButton } from '../../../../shared-components/rounded-button';
import { helper } from '../../../../utils/helper';
import { Mediator } from '../../../../utils/Mediator';

interface Props extends BlockProps {
    mediator: Mediator;
}

export class MessageForm extends Block {
    private mediator: Mediator;

    private input: Input;

    constructor(props: Props) {
        const input = new Input({
            id: 'message',
            type: 'text',
            onBlur: (target) => {
                const formData = new FormData();
                formData.set(target.id, target.value);
                this.onValidateForm(formData);
            },
            attr: {
                class: 'message-form__message',
            },
        });

        super({
            isError: false,
            Input: input,
            RoundedButton: new RoundedButton({
                type: 'submit',
                src: '/right_arrow.svg',
            }),
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    this.onValidateForm(formData);
                    helper.consoleFormData(formData);
                },
            },
        });
        this.mediator = props.mediator;
        this.input = input;
    }

    private onValidateForm(data: FormData) {
        this.mediator.validate(data).forEach((error) => {
            this.input.setAttributes({
                class: error.errorMessage
                    ? 'message-form__message message-form-error'
                    : 'message-form__message',
            });
        });
    }

    render() {
        return `<form class='message-form'>
                    {{{Input}}}
                    {{{RoundedButton}}}
                </form>`;
    }
}
