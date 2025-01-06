import { Block, BlockProps } from '../framework';
import { Mediator } from './Mediator';

type Component = { new (props: BlockProps): Block };

interface RouteData {
    Component: Component;
    defaultProps?: BlockProps;
}

interface Route extends RouteData {
    path: string;
}

interface RouterParams {
    routes: Route[];
    notFoundRoute: RouteData;
}

export class Router {
    constructor(
        private mediator: Mediator,
        private rootElement: HTMLDivElement,
        private routerParams: RouterParams
    ) {}

    init() {
        this.matchingRoute(this.getCurrentPath());
        window.addEventListener('popstate', () => {
            this.matchingRoute(this.getCurrentPath());
        });
    }

    navigateTo(path: string, props?: BlockProps) {
        this.matchingRoute(path, props);
        window.history.pushState({}, '', path);
    }

    private matchingRoute(path: string, props?: BlockProps) {
        const routeData = this.getRouteData(path);
        const routeProps = props ?? routeData.defaultProps;
        const component = new routeData.Component({
            mediator: this.mediator,
            ...routeProps,
        });
        this.render(component);
    }

    private getCurrentPath = () => window.location.pathname;

    private getRouteData(path: string) {
        return (
            this.routerParams.routes.find((route) => route.path === path) ??
            this.routerParams.notFoundRoute
        );
    }

    private render(element: Block) {
        this.rootElement.replaceChildren(element.getContent());
        element.dispatchComponentDidMount();
    }
}
