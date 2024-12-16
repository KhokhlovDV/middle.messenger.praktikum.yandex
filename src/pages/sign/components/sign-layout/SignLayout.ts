import Block, { BlockProps } from '../../../../framework/Block';
import { Link } from '../../../../shared-components/link';
import { Mediator } from '../../../../utils/Mediator';
import { Form } from '../form';
import { FormInputProps } from '../form/Form';

interface Props extends BlockProps {
    headerText: string;
    linkText: string;
    linkTo: string;
    buttonText: string;
    formFields: FormInputProps[];
    mediator: Mediator;
}

export class SignLayout extends Block {
    constructor(props: Props) {
        super({
            headerText: props.headerText,
            Form: new Form({
                className: 'sign-layout__form',
                buttonClassName: 'sign-layout__button',
                buttonText: props.buttonText,
                formFields: props.formFields,
                mediator: props.mediator,
            }),
            Link: new Link({
                text: props.linkText,
                to: props.linkTo,
                className: 'sign-layout__link link-accent link-sm',
                mediator: props.mediator,
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
