import { Block } from '../framework';
import { Component } from './types';

export class Route {
    private block?: Block;

    constructor(
        private pathname: string,
        private BlockClass: Component,
        private isProtected: boolean
    ) {}

    match(pathname: string) {
        return pathname === this.pathname;
    }

    leave() {
        this.block?.dispatchComponentDidUnmount();
        this.block = undefined;
    }

    render(outlet: HTMLDivElement) {
        if (!this.block) {
            this.block = new this.BlockClass({});
        }
        outlet.replaceChildren(this.block.getContent());
        this.block.dispatchComponentDidMount();
    }

    isProtectedRoute() {
        return this.isProtected;
    }
}
