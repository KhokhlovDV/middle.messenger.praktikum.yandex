import { chatController } from '../../../../../../controllers';
import { Block, BlockProps } from '../../../../../../framework';
import { Input, RoundedButton } from '../../../../../../shared-components';
import { helper, ValidationResult, Validator } from '../../../../../../utils';

export class MessageForm extends Block {
    private input: Input;

    constructor(props: BlockProps) {
        const input = new Input({
            id: 'message',
            type: 'text',
            onBlur: (value) => {
                const result = Validator.validate({
                    message: value,
                });
                this.onValidate(result);
            },
            attr: {
                class: 'message-form__message',
            },
        });

        super({
            ...props,
            Input: input,
            RoundedButton: new RoundedButton({
                type: 'submit',
                src: '/right_arrow.svg',
            }),
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    const target = e.target as HTMLFormElement;
                    const data = helper.convertFormToObject(target);
                    const result = Validator.validate(data);
                    this.onValidate(result);
                    if (result.filter((el) => el.errorMessage).length === 0) {
                        const message = new FormData(target).get(
                            'message'
                        ) as string;
                        chatController.sendMessage(message);
                    }
                    this.input.setProps({
                        value: '',
                    });
                },
            },
        });
        this.input = input;
    }

    private onValidate(results: ValidationResult[]) {
        const message = results.find((r) => r.id === 'message')?.errorMessage;
        this.input.setAttributes({
            class: message
                ? 'message-form__message message-form-error'
                : 'message-form__message',
        });
    }

    render() {
        return `<form class='message-form'>
                    {{{Input}}}
                    {{{RoundedButton}}}
                </form>`;
    }
}
