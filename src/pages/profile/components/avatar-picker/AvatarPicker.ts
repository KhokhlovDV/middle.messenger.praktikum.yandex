import Block, { BlockProps } from '../../../../framework/Block';
import { Input } from '../../../../shared-components/input';

interface Props extends BlockProps {
    src: string;
    className?: string;
}

export class AvatarPicker extends Block {
    constructor(props: Props) {
        super({
            ...props,
            Input: new Input({
                id: 'file-input',
                type: 'file',
                attr: {
                    class: 'avatar-picker__input',
                },
            }),
        });
    }

    render() {
        return `<form class='avatar-picker {{className}}'>
                    <label for='file-input' class='avatar-picker__label'>
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
