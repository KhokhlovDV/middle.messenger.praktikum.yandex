import { Block, BlockProps } from '../block';
import { isEqual } from './isEqual';
import { store, StoreEvents } from './store';

export function connect<T extends Record<string, unknown>>(
    mapStateToProps: (state: T) => Record<string, unknown>
) {
    return function (Component: typeof Block) {
        return class extends Component {
            constructor(props: BlockProps) {
                let state = mapStateToProps(store.getState() as T);
                super({ ...props, ...state });
                store.on(StoreEvents.Updated, () => {
                    const newState = mapStateToProps(store.getState() as T);
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }
                    state = newState;
                });
            }
        };
    };
}
