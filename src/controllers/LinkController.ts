import { Router } from '../router';

export class LinkController {
    static navigate(page: string) {
        Router.getInstance().go(page);
    }
}
