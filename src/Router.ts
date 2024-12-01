interface Route {
    path: string;
    onRouteMatch: () => void;
}

export class Router {
    constructor(private routes: Route[], private notFoundRoute: string) {
        this.navigate(this.getCurrentPath());
        window.addEventListener('popstate', () => {
            this.getRoute(this.getCurrentPath())?.onRouteMatch();
        });
    }

    navigate(path: string) {
        const currentRoute =
            this.getRoute(path) ?? this.getRoute(this.notFoundRoute);
        if (!currentRoute) {
            throw new Error('Wrong route setup');
        }
        currentRoute.onRouteMatch();
        window.history.pushState({}, '', path);
    }

    private getCurrentPath = () => window.location.pathname;

    private getRoute = (path: string) =>
        this.routes.find((route) => route.path === path);
}
