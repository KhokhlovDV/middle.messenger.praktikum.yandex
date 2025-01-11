import { Block, BlockProps } from '../../../../framework';
import { Link } from '../../../../shared-components';
import { Form, FormInputProps } from '../form';

interface Props extends BlockProps {
    headerText: string;
    linkText: string;
    linkTo: string;
    buttonText: string;
    formFields: FormInputProps[];
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
            }),
            Link: new Link({
                text: props.linkText,
                to: props.linkTo,
                attr: {
                    class: 'sign-layout__link link-accent link-sm',
                },
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
