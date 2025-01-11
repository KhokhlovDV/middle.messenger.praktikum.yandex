import { Router } from '../../framework';

class LinkController {
    public navigate(page: string) {
        Router.getInstance().go(page);
    }
}

export const Controller = new LinkController();
