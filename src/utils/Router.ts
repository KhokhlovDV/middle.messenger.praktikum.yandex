import Block, { BlockProps } from '../framework/Block';
import { Mediator } from './Mediator';

type Component = { new (props: BlockProps): Block };

interface Route {
    path: string;
    Component: Component;
    props?: BlockProps;
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
            ? new currentRoute.Component({
                  mediator: this.mediator,
                  ...currentRoute.props,
              })
            : new this.routerParams.NotFoundComponent({
                  mediator: this.mediator,
              });
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
