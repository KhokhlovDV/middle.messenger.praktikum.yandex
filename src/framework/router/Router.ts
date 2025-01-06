import { Mediator } from '../../utils/Mediator';

export class Router {
    private static instance: Router;

    private currentRoute = null;

    static getInstance(mediator: Mediator) {
        if (!Router.instance) {
            Router.instance = new Router(mediator, window.history);
        }
        return Router.instance;
    }

    private constructor(private mediator: Mediator, private history: History) {}
}
