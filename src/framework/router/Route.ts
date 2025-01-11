import { Block } from '../block';
import { Component } from './types';

export class Route {
    private block?: Block;

    constructor(private pathname: string, private BlockClass: Component) {}

    match(pathname: string) {
        return pathname === this.pathname;
    }

    leave() {
        this.block?.dispatchComponentDidUnmount();
    }

    render(outlet: HTMLDivElement) {
        if (!this.block) {
            this.block = new this.BlockClass();
        }
        outlet.replaceChildren(this.block.getContent());
        this.block.dispatchComponentDidMount();
    }
}
