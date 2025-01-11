import { Block, BlockProps } from '../block';

export type Component = { new (props: BlockProps): Block };
