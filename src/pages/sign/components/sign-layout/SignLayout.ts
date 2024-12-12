import Block from '../../../../framework/Block';
import { Link } from '../../../../shared-components/link';
import { Form } from '../form';
import { FormInputProps } from '../form/Form';

interface Props {
    headerText: string;
    linkText: string;
    linkTo: string;
    onLinkClick: (to: string) => void;
    onFormSubmit: (data: FormData) => void;
    buttonText: string;
    formFields: FormInputProps[];
    onBlur: (id: string, value: string) => void;
}

export class SignLayout extends Block {
    constructor(props: Props) {
        super({
            headerText: props.headerText,
            Form: new Form({
                onFormSubmit: props.onFormSubmit,
                className: 'sign-layout__form',
                buttonClassName: 'sign-layout__button',
                buttonText: props.buttonText,
                formFields: props.formFields,
                onBlur: props.onBlur,
            }),
            Link: new Link({
                onLinkClick: props.onLinkClick,
                text: props.linkText,
                to: props.linkTo,
                classNames: 'sign-layout__link link-accent link-sm',
            }),
        });
    }

    render() {
        return `<div class='sign-layout'>
                    <h2 class="sign-layout__header">{{headerText}}</h2>
                    {{{Form}}}
                    {{{Link}}}
                </div>`;
    }
}
