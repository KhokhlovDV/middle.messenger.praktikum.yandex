import { Block, BlockProps } from '../../framework';
import { Link } from '../../shared-components';

interface Props extends BlockProps {
    errorCode: string;
    description: string;
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
