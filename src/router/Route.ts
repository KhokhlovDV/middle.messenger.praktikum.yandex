import { Block, BlockProps } from '../framework';
import { Component } from './types';

export class Route {
    private block?: Block;

    constructor(
        public readonly pathname: string,
        private BlockClass: Component,
        private defaultProps: BlockProps = {}
    ) {}

    match(pathname: string) {
        return pathname === this.pathname;
    }

    leave() {
        this.block?.dispatchComponentDidUnmount();
        this.block = undefined;
    }

    render(outlet: HTMLDivElement) {
        if (this.block) {
            this.leave();
        }
        this.block = new this.BlockClass(this.defaultProps);
        outlet.replaceChildren(this.block.getContent());
        this.block.dispatchComponentDidMount();
    }
}
