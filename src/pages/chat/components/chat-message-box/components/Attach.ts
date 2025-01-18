import { RESOURCES } from '../../../../../constants';
import { Block, BlockProps } from '../../../../../framework';
import { Input } from '../../../../../shared-components';

export class Attach extends Block {
    constructor(props: BlockProps) {
        super({
            ...props,
            host: RESOURCES,
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    const target = e.target as HTMLFormElement;
                    const data = new FormData(target);
                    alert('file attach');
                },
            },
            Input: new Input({
                id: 'attach',
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
                    <label for='attach'>
                        <img src="/attach.svg" alt="attach">
                    </label>
                    {{{Input}}}
                </form>`;
    }
}
