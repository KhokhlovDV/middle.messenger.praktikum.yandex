import { chatController } from '../../../../../../controllers';
import { Block, BlockProps } from '../../../../../../framework';
import { Input } from '../../../../../../shared-components';

export class Attach extends Block {
    constructor(props: BlockProps) {
        super({
            ...props,
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    const target = e.target as HTMLFormElement;
                    const data = new FormData(target);
                    chatController.sendFile(data);
                },
            },
            Input: new Input({
                id: 'resource',
                type: 'file',
                accept: 'image/*',
                attr: {
                    class: 'no-display',
                },
                isSubmitFormOnChange: true,
            }),
        });
    }

    render() {
        return `<form>
                    <label for='resource' class='attach'>
                        <img src="/attach.svg" alt="attach">
                    </label>
                    {{{Input}}}
                </form>`;
    }
}
