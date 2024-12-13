import Block from '../framework/Block';
import { Mediator } from './Mediator';

type Component = { new (mediator: Mediator): Block };

interface Route {
    path: string;
    Component: Component;
}

interface RouterParams {
    routes: Route[];
    NotFoundComponent: Component;
}

export class Router {
    constructor(
        private mediator: Mediator,
        private rootElement: HTMLDivElement,
        private routerParams: RouterParams
    ) {
        this.matchingRoute(this.getCurrentPath());
        window.addEventListener('popstate', () => {
            this.matchingRoute(this.getCurrentPath());
        });
    }

    navigateTo(path: string) {
        this.matchingRoute(path);
        window.history.pushState({}, '', path);
    }

    private matchingRoute(path: string) {
        const currentRoute = this.getRoute(path);
        const component = currentRoute
            ? new currentRoute.Component(this.mediator)
            : new this.routerParams.NotFoundComponent(this.mediator);
        this.render(component);
    }

    private getCurrentPath = () => window.location.pathname;

    private getRoute = (path: string) =>
        this.routerParams.routes.find((route) => route.path === path);

    private render(element: Block) {
        this.rootElement.replaceChildren(element.getContent());
        element.dispatchComponentDidMount();
    }
}
