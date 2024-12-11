import Handlebars from 'handlebars';
import { EventBus } from './EventBus';
import { helper } from '../utils/helper';

interface BlockProps {
    [key: string]: unknown;
}

export default abstract class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    private eventBus = new EventBus();

    private element?: HTMLElement;

    //  private id = helper.generateRandomId();

    protected children: Record<string, Block> = {};

    private props: BlockProps;

    constructor(propsWithChildren: BlockProps = {}) {
        //       const { props, children, lists } =
        //       this._getChildrenPropsAndProps(propsWithChildren);
        //       this.props = this._makePropsProxy({ ...props });
        //       this.children = children;
        //       this.lists = this._makePropsProxy({ ...lists });
        //       this._registerEvents(eventBus);

        this.props = this.makePropsProxy(propsWithChildren);
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

    private makePropsProxy(props: BlockProps) {
        return new Proxy(props, {
            get: (target, prop: string) => {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
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
        this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        this.eventBus.on(
            Block.EVENTS.FLOW_CDM,
            this._componentDidMount.bind(this)
        );
        this.eventBus.on(
            Block.EVENTS.FLOW_CDU,
            this._componentDidUpdate.bind(this)
        );
    }

    private init() {
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    private _render() {
        //       const propsAndStubs = { ...this.props };
        //       const tmpId =  Math.floor(100000 + Math.random() * 900000);
        //       Object.entries(this.children).forEach(([key, child]) => {
        //         propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        //       });

        //       Object.entries(this.lists).forEach(([key]) => {
        //         propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
        //       });

        const fragment = helper.createTemplate();
        fragment.innerHTML = Handlebars.compile(this.render())(this.props);
        //       Object.values(this.children).forEach(child => {
        //         const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        //         if (stub) {
        //           stub.replaceWith(child.getContent());
        //         }
        //       });

        //       Object.entries(this.lists).forEach(([, child]) => {
        //         const listCont = this._createDocumentElement('template');
        //         child.forEach(item => {
        //           if (item instanceof Block) {
        //             listCont.content.append(item.getContent());
        //           } else {
        //             listCont.content.append(`${item}`);
        //           }
        //         });
        //         const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
        //         if (stub) {
        //           stub.replaceWith(listCont.content);
        //         }
        //       });
        const newElement = fragment.content.firstElementChild;
        if (!(newElement instanceof HTMLElement)) {
            throw new Error('Error in framework render');
        }
        if (this.element) {
            this.element.replaceWith(newElement);
        }
        this.element = newElement;
        //       this._addEvents();
        //       this.addAttributes();
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

// export default class Block {

//     protected lists: Record<string, any[]>;

//     private _addEvents(): void {
//       const { events = {} } = this.props;
//       Object.keys(events).forEach(eventName => {
//         if (this._element) {
//           this._element.addEventListener(eventName, events[eventName]);
//         }
//       });
//     }
//     private _getChildrenPropsAndProps(propsAndChildren: BlockProps): {
//       children: Record<string, Block>,
//       props: BlockProps,
//       lists: Record<string, any[]>
//     } {
//       const children: Record<string, Block> = {};
//       const props: BlockProps = {};
//       const lists: Record<string, any[]> = {};

//       Object.entries(propsAndChildren).forEach(([key, value]) => {
//         if (value instanceof Block) {
//           children[key] = value;
//         } else if (Array.isArray(value)) {
//           lists[key] = value;
//         } else {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//           props[key] = value;
//         }
//       });

//       return { children, props, lists };
//     }

//     protected addAttributes(): void {
//       const { attr = {} } = this.props;

//       Object.entries(attr).forEach(([key, value]) => {
//         if (this._element) {
//           this._element.setAttribute(key, value as string);
//         }
//       });
//     }

//     protected setAttributes(attr: any): void {
//       Object.entries(attr).forEach(([key, value]) => {
//         if (this._element) {
//           this._element.setAttribute(key, value as string);
//         }
//       });
//     }

//     public setLists = (nextList: Record<string, any[]>): void => {
//       if (!nextList) {
//         return;
//       }

//       Object.assign(this.lists, nextList);
//     };

//     public show(): void {
//       const content = this.getContent();
//       if (content) {
//         content.style.display = 'block';
//       }
//     }

//     public hide(): void {
//       const content = this.getContent();
//       if (content) {
//         content.style.display = 'none';
//       }
//     }
//   }
