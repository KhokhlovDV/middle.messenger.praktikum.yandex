import { BlockProps } from '../framework/Block';

export interface Mediator {
    navigateTo(path: string, props?: BlockProps): void;
    validate(data: FormData): { id: string; errorMessage: string }[];
}
