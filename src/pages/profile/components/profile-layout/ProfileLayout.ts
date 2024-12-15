import Block, { BlockProps } from '../../../../framework/Block';
import { RoundedButton } from '../../../../shared-components/rounded-button';
import { AvatarPicker } from '../avatar-picker';

interface Props extends BlockProps {
    avatar: string;
    firstName: string;
    content: Block[];
    className?: string;
    onBackClick: () => void;
}

export class ProfileLayout extends Block {
    constructor(props: Props) {
        super({
            className: props.className,
            firstName: props.firstName,
            BackButton: new RoundedButton({
                src: '/left_arrow.svg',
                onClick: () => {
                    props.onBackClick();
                },
            }),
            AvatarPicker: new AvatarPicker({
                src: props.avatar,
                className: 'profile-layout__avatar',
            }),
            Content: props.content,
        });
    }

    render() {
        return `<div class="profile-layout {{className}}">
                    <nav class="profile-layout__nav">
                        {{{BackButton}}}
                    </nav>
                    <main class="profile-layout__content">
                        {{{AvatarPicker}}}
                        <h3 class="profile-layout__first-name">{{firstName}}</h3>
                        {{{Content}}}
                    </main>
                </div>`;
    }
}
