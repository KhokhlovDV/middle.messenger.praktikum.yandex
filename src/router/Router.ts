import { Route } from './Route';
import { Component } from './types';

export class Router {
    private history: History;

    private static instance: Router;

    private currentRoute: Route | null = null;

    private routes: Route[] = [];

    private notFoundRoute?: Route;

    private outlet?: HTMLDivElement;

    static getInstance() {
        if (!Router.instance) {
            Router.instance = new Router();
        }
        return Router.instance;
    }

    private constructor() {
        this.history = window.history;
    }

    use(pathname: string, component: Component, isProtected: boolean = false) {
        const route = new Route(pathname, component, isProtected);
        this.routes.push(route);
        return this;
    }

    start(outlet: HTMLDivElement) {
        this.outlet = outlet;
        window.onpopstate = (event) => {
            if (event.currentTarget) {
                const target = event.currentTarget as Window;
                this.onRoute(target.location.pathname);
            }
        };
        this.onRoute(window.location.pathname);
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this.onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    setNotFoundRoute(pathname: string, component: Component) {
        const route = new Route(pathname, component, false);
        this.notFoundRoute = route;
        return this;
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }

    private onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }
        if (this.currentRoute) {
            this.currentRoute.leave();
        }
        if (!this.outlet) {
            throw new Error('Wrong use api. Call start method');
        }
        route.render(this.outlet);
        this.currentRoute = route;
    }
}
