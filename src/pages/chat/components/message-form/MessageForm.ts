import { Block } from '../../../../framework';
import { Input, RoundedButton } from '../../../../shared-components';

export class MessageForm extends Block {
    private input: Input;

    constructor() {
        const input = new Input({
            id: 'message',
            type: 'text',
            onBlur: (value) => {
                // this.validateField(value, 'message');
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
                    // this.submitForm(e);
                },
            },
        });
        this.input = input;
    }

    // onValidationResult(result: ValidationResult): void {
    //     this.input.setAttributes({
    //         class: result.errorMessage
    //             ? 'message-form__message message-form-error'
    //             : 'message-form__message',
    //     });
    // }

    render() {
        return `<form class='message-form'>
                    {{{Input}}}
                    {{{RoundedButton}}}
                </form>`;
    }
}
