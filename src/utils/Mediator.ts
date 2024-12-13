export interface Mediator {
    navigateTo(path: string): void;
    validate(data: FormData): { id: string; errorMessage: string }[];
}
