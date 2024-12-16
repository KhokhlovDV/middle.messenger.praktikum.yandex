import Block, { BlockProps } from '../../framework/Block';
import { Link } from '../../shared-components/link';
import { Mediator } from '../../utils/Mediator';

interface Props extends BlockProps {
    errorCode: string;
    description: string;
    mediator: Mediator;
}

export class Error extends Block {
    constructor(props: Props) {
        super({
            errorCode: props.errorCode,
            description: props.description,
            Link: new Link({
                mediator: props.mediator,
                text: 'Назад к чатам',
                to: '/chat',
                className: 'link-accent link-sm',
            }),
        });
    }

    render() {
        return `<div class='error-page'>
                    <h1 class='error-page__error-code'>{{errorCode}}</h1>
                    <h2 class='error-page__error-description'>{{description}}</h2>
                    {{{Link}}}
                </div>`;
    }
}
