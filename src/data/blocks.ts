import { BlockData, BlockId } from "./types";

export function getBlockOrDefault(id: number): BlockData {
    return BLOCKS[id as BlockId] ?? BLOCKS[0];
}

export const BLOCKS: Record<BlockId, BlockData> = {
    0: {
        id: 0,
        textureKey: "candy_0",
        radius: 24,
        score: 10,
        nextBlockId: 1
    },
    1: {
        id: 1,
        textureKey: "candy_1",
        radius: 36,
        score: 20,
        nextBlockId: 2
    },
    2: {
        id: 2,
        textureKey: "candy_2",
        radius: 48,
        score: 30,
        nextBlockId: 3
    },
    3: {
        id: 3,
        textureKey: "candy_3",
        radius: 60,
        score: 40,
        nextBlockId: 4
    },
    4: {
        id: 0,
        textureKey: "candy_4",
        radius: 72,
        score: 50,
        nextBlockId: 5
    },
    5: {
        id: 0,
        textureKey: "candy_5",
        radius: 84,
        score: 60,
        nextBlockId: 6
    },
    6: {
        id: 0,
        textureKey: "candy_6",
        radius: 96,
        score: 0,
        nextBlockId: undefined
    }
};