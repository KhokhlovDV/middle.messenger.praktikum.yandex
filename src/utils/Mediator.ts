import { BlockProps } from '../framework/Block';

export interface DataForValidate {
    id: string;
    value: string;
}

export interface ValidationResult {
    id: string;
    errorMessage: string;
}

export interface Mediator {
    navigateTo(path: string, props?: BlockProps): void;
    validate(data: DataForValidate[]): ValidationResult[];
    getAppData(): unknown;
}
