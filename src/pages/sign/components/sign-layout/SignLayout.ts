import { Block, BlockProps } from '../../../../framework';
import { Form, FormInputProps, Link } from '../../../../shared-components';

interface Props extends BlockProps {
    headerText: string;
    linkText: string;
    buttonText: string;
    formFields: FormInputProps[];
    onFormSuccess: (form: HTMLFormElement) => void;
    onLinkClick: () => void;
    errorMessage?: string;
}

export class SignLayout extends Block {
    constructor(props: Props) {
        super({
            headerText: props.headerText,
            errorMessage: props.errorMessage,
            Form: new Form({
                className: 'sign-layout__form',
                buttonClassName: 'sign-layout__button',
                buttonText: props.buttonText,
                formFields: props.formFields,
                onFormSuccess: props.onFormSuccess,
            }),
            Link: new Link({
                text: props.linkText,
                className: 'sign-layout__link link-accent link-sm',
                onLinkClick: props.onLinkClick,
            }),
        });
    }

    render() {
        return `<div class='sign-layout'>
                    <h2 class="sign-layout__header">
                        {{headerText}}
                        {{#if errorMessage}}
                            <div class='sign-layout__error'>{{errorMessage}}</div>
                        {{/if}}
                    </h2>
                    {{{Form}}}
                    {{{Link}}}
                </div>`;
    }
}
