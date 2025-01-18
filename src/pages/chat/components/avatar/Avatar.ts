import { RESOURCES } from '../../../../constants';
import { chatController } from '../../../../controllers';
import { Block, BlockProps } from '../../../../framework';
import { Input } from '../../../../shared-components';

interface Props extends BlockProps {
    src: string;
    className: string;
    isChangeable: boolean;
    chatId?: number;
}

export class Avatar extends Block {
    constructor(props: Props) {
        super({
            ...props,
            host: RESOURCES,
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    const target = e.target as HTMLFormElement;
                    const data = new FormData(target);
                    data.append('chatId', String(this.props.chatId));
                    chatController.avatar(data);
                },
            },
            Input: new Input({
                id: 'avatar',
                type: 'file',
                accept: 'image/*',
                attr: {
                    class: 'avatar__input',
                },
                isSubmitFormOnChange: true,
            }),
        });
    }

    render() {
        return `{{#if isChangeable}}
                    <form class='avatar {{className}}'>
                        <label for='avatar'>
                            {{#if src}}
                                <img src='{{host}}{{src}}' class='avatar__image' alt='avatar' />
                            {{else}}
                                <div class='avatar {{className}}'></div>
                            {{/if}}
                        </label>
                        {{{Input}}}
                    </form>
                {{else}}
                    {{#if src}}
                        <img src='{{host}}{{src}}' class='avatar {{className}}' alt='avatar' />
                    {{else}}
                        <div class='avatar {{className}}'></div>
                    {{/if}}
                {{/if}}`;
    }
}
