import Block, { BlockProps } from '../../../../framework/Block';
import { Input } from '../../../../shared-components/input';

interface Props extends BlockProps {
    onSubmit: (data: FormData) => void;
}

export class SearchForm extends Block {
    constructor(props: Props) {
        super({
            Input: new Input({
                id: 'search',
                type: 'text',
                placeholder: 'Поиск',
                className: 'search-form__search-field',
            }),
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    props.onSubmit(formData);
                },
            },
        });
    }

    render() {
        return `<form>{{{Input}}}</form>`;
    }
}
