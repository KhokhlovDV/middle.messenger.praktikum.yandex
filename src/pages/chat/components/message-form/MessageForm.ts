import { BlockProps, BlockWithValidation } from '../../../../framework';
import { Input, RoundedButton } from '../../../../shared-components';
import { Mediator, ValidationResult } from '../../../../utils/Mediator';

interface Props extends BlockProps {
    mediator: Mediator;
}

export class MessageForm extends BlockWithValidation {
    private input: Input;

    constructor(props: Props) {
        const input = new Input({
            id: 'message',
            type: 'text',
            onBlur: (value) => {
                this.validateField(value, 'message');
            },
            attr: {
                class: 'message-form__message',
            },
        });

        super(
            {
                isError: false,
                Input: input,
                RoundedButton: new RoundedButton({
                    type: 'submit',
                    src: '/right_arrow.svg',
                }),
                events: {
                    submit: (e: SubmitEvent) => {
                        this.submitForm(e);
                    },
                },
            },
            props.mediator
        );
        this.input = input;
    }

    onValidationResult(result: ValidationResult): void {
        this.input.setAttributes({
            class: result.errorMessage
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
