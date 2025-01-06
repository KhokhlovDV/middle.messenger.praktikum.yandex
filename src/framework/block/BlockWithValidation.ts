import { helper } from '../../utils/helper';
import {
    DataForValidate,
    Mediator,
    ValidationResult,
} from '../../utils/Mediator';
import { Block, BlockProps } from './Block';

export abstract class BlockWithValidation extends Block {
    constructor(props: BlockProps, private mediator: Mediator) {
        super(props);
    }

    validateField(value: string, id: string) {
        this.callValidation([{ id, value }]);
    }

    submitForm(e: SubmitEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        this.callValidation(helper.convertFormDataToArray(formData));
        helper.consoleFormData(formData);
    }

    private callValidation(data: DataForValidate[]) {
        this.mediator.validate(data).forEach((result) => {
            this.onValidationResult(result);
        });
    }

    abstract onValidationResult(result: ValidationResult): void;
}
