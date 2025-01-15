import { RESOURCES } from '../../../../constants';
import { userController } from '../../../../controllers';
import { Block, BlockProps } from '../../../../framework';
import { Input } from '../../../../shared-components';

interface Props extends BlockProps {
    src: string;
    className?: string;
}

export class AvatarPicker extends Block {
    constructor(props: Props) {
        super({
            ...props,
            host: RESOURCES,
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    const target = e.target as HTMLFormElement;
                    const data = new FormData(target);
                    userController.profileAvatar(data);
                },
            },
            Input: new Input({
                id: 'avatar',
                type: 'file',
                accept: 'image/*',
                attr: {
                    class: 'avatar-picker__input',
                },
                isSubmitFormOnChange: true,
            }),
        });
    }

    render() {
        return `<form class='avatar-picker {{className}}'>
                    <label for='avatar' class='avatar-picker__label'>
                        {{#if src}}
                            <img src='{{host}}{{src}}' class='avatar-picker__image' alt='avatar' />
                        {{else}}
                            <img src='/noavatar.svg' alt='No avatar' />
                        {{/if}}
                    </label>
                    {{{Input}}}
                </form>`;
    }
}
