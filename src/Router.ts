interface Route {
    path: string;
    onRouteMatch: () => void;
}

interface RouterParams {
    routes: Route[];
    onRouteNotFound: () => void;
}

export class Router {
    constructor(private params: RouterParams) {
        this.matchingRoute(this.getCurrentPath());
        window.addEventListener('popstate', () => {
            this.matchingRoute(this.getCurrentPath());
        });
    }

    navigate(path: string) {
        this.matchingRoute(path);
        window.history.pushState({}, '', path);
    }

    private matchingRoute(path: string) {
        const currentRoute = this.getRoute(path);
        if (!currentRoute) {
            this.params.onRouteNotFound();
        } else {
            currentRoute.onRouteMatch();
        }
    }

    private getCurrentPath = () => window.location.pathname;

    private getRoute = (path: string) =>
        this.params.routes.find((route) => route.path === path);
}
