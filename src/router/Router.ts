import { BlockProps } from '../framework';
import { Route } from './Route';
import { Component } from './types';

type RouteHook = (pathname: string) => Promise<string>;

export class Router {
    private history: History;

    private static instance: Router;

    private currentRoute: Route | null = null;

    private routes: Route[] = [];

    private notFoundRoute?: Route;

    private outlet?: HTMLDivElement;

    private asyncChangeRouteHook?: RouteHook;

    static getInstance() {
        if (!Router.instance) {
            Router.instance = new Router();
        }
        return Router.instance;
    }

    private constructor() {
        this.history = window.history;
    }

    use(pathname: string, component: Component, defaultProps: BlockProps = {}) {
        const route = new Route(pathname, component, defaultProps);
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

    setNotFoundRoute(
        pathname: string,
        component: Component,
        defaultProps: BlockProps
    ) {
        const route = new Route(pathname, component, defaultProps);
        this.notFoundRoute = route;
        return this;
    }

    setChangeRouteHook(hook: RouteHook) {
        this.asyncChangeRouteHook = hook;
        return this;
    }

    private setPath(pathname: string) {
        window.history.replaceState({}, '', pathname);
    }

    private getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }

    private async onRoute(pathname: string) {
        const checkedPathname = this.asyncChangeRouteHook
            ? await this.asyncChangeRouteHook(pathname)
            : pathname;
        if (checkedPathname !== pathname) {
            this.setPath(checkedPathname);
        }
        const route = this.getRoute(checkedPathname);
        if (this.currentRoute) {
            this.currentRoute.leave();
        }
        if (!this.outlet) {
            throw new Error('Wrong use api. Call start method');
        }
        if (!this.notFoundRoute) {
            throw new Error('Provide not found route');
        }
        this.currentRoute = route ?? this.notFoundRoute;
        if (!route) {
            this.setPath(this.notFoundRoute.pathname);
        }
        this.currentRoute.render(this.outlet);
    }
}
