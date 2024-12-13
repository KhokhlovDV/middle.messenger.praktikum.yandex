import Block from '../../../../framework/Block';
import { Link } from '../../../../shared-components/link';
import { Mediator } from '../../../../utils/Mediator';
import { Form } from '../form';
import { FormInputProps } from '../form/Form';

interface Props {
    headerText: string;
    linkText: string;
    linkTo: string;
    buttonText: string;
    formFields: FormInputProps[];
}

export class SignLayout extends Block {
    constructor(props: Props, mediator: Mediator) {
        super({
            headerText: props.headerText,
            Form: new Form(
                {
                    className: 'sign-layout__form',
                    buttonClassName: 'sign-layout__button',
                    buttonText: props.buttonText,
                    formFields: props.formFields,
                },
                mediator
            ),
            Link: new Link(
                {
                    text: props.linkText,
                    to: props.linkTo,
                    classNames: 'sign-layout__link link-accent link-sm',
                },
                mediator
            ),
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
