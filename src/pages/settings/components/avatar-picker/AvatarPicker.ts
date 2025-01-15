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
            Input: new Input({
                id: 'avatar',
                type: 'file',
                accept: 'image/*',
                attr: {
                    class: 'avatar-picker__input',
                },
            }),
        });
    }

    render() {
        return `<form class='avatar-picker {{className}}'>
                    <label for='avatar' class='avatar-picker__label'>
                        {{#if src}}
                            <img src='{{src}}' class='avatar-picker__image' alt='avatar' />
                        {{else}}
                            <img src='/noavatar.svg' alt='No avatar' />
                        {{/if}}
                    </label>
                    {{{Input}}}
                </form>`;
    }
}
