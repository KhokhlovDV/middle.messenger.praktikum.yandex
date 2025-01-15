import { Routes } from '../../constants';
import { authController } from '../../controllers';
import { Block, BlockProps } from '../../framework';
import { Router } from '../../router';
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
                text: 'Назад к чатам',
                to: '/chat',
                className: 'link-accent link-sm',
                onLinkClick: () => {
                    this.onLinkClick();
                },
            }),
        });
    }

    async onLinkClick() {
        const router = Router.getInstance();
        const result = await authController.isUserAuthenticated();
        if (result) {
            router.go(Routes.Messenger);
        } else {
            router.go(Routes.Default);
        }
    }

    render() {
        return `<div class='error-page'>
                    <h1 class='error-page__error-code'>{{errorCode}}</h1>
                    <h2 class='error-page__error-description'>{{description}}</h2>
                    {{{Link}}}
                </div>`;
    }
}
