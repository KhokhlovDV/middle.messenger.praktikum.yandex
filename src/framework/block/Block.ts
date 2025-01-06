import Handlebars from 'handlebars';
import { helper } from '../../utils/helper';
import { Callback, EventBus } from './EventBus';

type EventListener = (e: Event) => void;

export interface BlockProps {
    [key: string]: unknown;
    events?: Record<string, EventListener>;
    attr?: Record<string, string>;
}

export abstract class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    private eventBus = new EventBus();

    private element?: HTMLElement;

    protected id = helper.generateRandomId();

    protected children: Record<string, Block> = {};

    protected props: BlockProps;

    protected lists: Record<string, unknown>;

    private eventListeners: Record<string, EventListener> = {};

    constructor(propsWithChildren: BlockProps = {}) {
        const { props, children, lists } =
            this.getChildrenPropsAndProps(propsWithChildren);
        this.lists = this.makePropsProxy({ ...lists });
        this.props = this.makePropsProxy({ ...props });
        this.children = children;
        this.registerEvents();
        this.eventBus.emit(Block.EVENTS.INIT);
    }

    public getContent() {
        if (!this.element) {
            throw new Error('Element is not created');
        }
        return this.element;
    }

    public dispatchComponentDidMount(): void {
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    public setProps = (nextProps: BlockProps) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    public setLists = (nextList: Record<string, unknown[]>): void => {
        if (!nextList) {
            return;
        }
        Object.assign(this.lists, nextList);
    };

    private getChildrenPropsAndProps(propsAndChildren: BlockProps): {
        children: Record<string, Block>;
        props: BlockProps;
        lists: Record<string, unknown>;
    } {
        const children: Record<string, Block> = {};
        const props: BlockProps = {};
        const lists: Record<string, unknown> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value)) {
                lists[key] = value;
            } else {
                props[key] = value;
            }
        });
        return {
            children,
            props,
            lists,
        };
    }

    private makePropsProxy(props: BlockProps) {
        return new Proxy(props, {
            get: (target, prop: string) => {
                const value = target[prop];
                return typeof value === 'function'
                    ? (value.bind(target) as typeof value)
                    : value;
            },
            set: (target, prop: string, value: unknown) => {
                const oldTarget = { ...target };
                target[prop] = value;
                this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('No access');
            },
        });
    }

    private registerEvents() {
        this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this) as Callback);
        this.eventBus.on(
            Block.EVENTS.FLOW_RENDER,
            this._render.bind(this) as Callback
        );
        this.eventBus.on(
            Block.EVENTS.FLOW_CDM,
            this._componentDidMount.bind(this) as Callback
        );
        this.eventBus.on(
            Block.EVENTS.FLOW_CDU,
            this._componentDidUpdate.bind(this) as Callback
        );
    }

    private init() {
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    private _render() {
        this.removeEvents();
        const propsAndStubs = { ...this.props };
        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
        });

        const listId = helper.generateRandomId();
        Object.entries(this.lists).forEach(([key]) => {
            propsAndStubs[key] = `<div data-id="__l_${listId}"></div>`;
        });

        const fragment = helper.createTemplate();
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(
                `[data-id="${child.id}"]`
            );
            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        Object.entries(this.lists).forEach(([, child]) => {
            if (Array.isArray(child)) {
                const listCont = helper.createTemplate();
                child.forEach((item) => {
                    if (item instanceof Block) {
                        listCont.content.append(item.getContent());
                    } else {
                        listCont.content.append(`${item}`);
                    }
                });
                const stub = fragment.content.querySelector(
                    `[data-id="__l_${listId}"]`
                );
                if (stub) {
                    stub.replaceWith(listCont.content);
                }
            }
        });

        const newElement = fragment.content.firstElementChild;
        if (!(newElement instanceof HTMLElement)) {
            throw new Error('Error in framework render');
        }
        if (this.element) {
            this.element.replaceWith(newElement);
        }
        this.element = newElement;
        this.addEvents();
        this.addAttributes();
    }

    private removeEvents(): void {
        Object.keys(this.eventListeners).forEach((eventName) => {
            if (this.element) {
                this.element.removeEventListener(
                    eventName,
                    this.eventListeners[eventName]
                );
            }
        });
    }

    private addEvents(): void {
        const { events = {} } = this.props;
        Object.assign(this.eventListeners, events);
        Object.keys(events).forEach((eventName) => {
            if (this.element) {
                this.element.addEventListener(eventName, events[eventName]);
            }
        });
    }

    private addAttributes(): void {
        const { attr = {} } = this.props;

        Object.entries(attr).forEach(([key, value]) => {
            if (this.element) {
                this.element.setAttribute(key, value);
            }
        });
    }

    public setAttributes(attr: Record<string, string>): void {
        Object.entries(attr).forEach(([key, value]) => {
            if (this.element) {
                this.element.setAttribute(key, value);
            }
        });
    }

    abstract render(): string;

    private _componentDidMount() {
        this.componentDidMount();
        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    protected componentDidMount() {}

    private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
        if (!this.componentDidUpdate(oldProps, newProps)) {
            return;
        }
        this._render();
    }

    protected componentDidUpdate = (
        oldProps: BlockProps,
        newProps: BlockProps
    ) => oldProps !== newProps;
}
