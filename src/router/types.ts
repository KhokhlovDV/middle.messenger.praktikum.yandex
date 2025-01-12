import { Block, BlockProps } from '../framework';

export type Component = { new (props: BlockProps): Block };
