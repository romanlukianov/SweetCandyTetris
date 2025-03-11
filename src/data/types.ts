import { IBodyDefinition } from 'matter-js';
import Block from '../components/Block';

export type BlockId = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Coordinate = { x: number, y: number};

export type BlockData = {
    id: BlockId;
    textureKey: string;
    radius: number;
    score: number;
    nextBlockId?: BlockId;
};

// matter.js body extension for tracking a link to the Block instance
// so instead of lookup for each block in pairs - I will know exact blocks to process during collision
export interface CustomBody extends IBodyDefinition {
    blockLink?: Block;
}