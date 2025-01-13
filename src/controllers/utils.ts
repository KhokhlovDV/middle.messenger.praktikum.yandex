import { Routes } from '../constants';
import { Router } from '../router';
import { HttpError } from '../utils/http-transport';

export function handleError(error: unknown) {
    alert(error);
    if (error instanceof HttpError) {
        if (error.status >= 500) {
            Router.getInstance().go(Routes.Error);
        } else {
            throw new Error(error.message);
        }
    }
}
