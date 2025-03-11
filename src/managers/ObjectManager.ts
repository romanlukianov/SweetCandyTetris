import { Vector } from "matter-js";
import Block from "../components/Block";
import Physics from "../core/physics/Physics";
import Renderer from "../core/render/Renderer";
import { getBlockOrDefault } from "../data/blocks";

class ObjectManager {
    private blocks: Block[] = [];

    constructor(private renderer: Renderer, private physics: Physics) { }

    public createBlock(id: number, position: Vector): Block {
        const data = getBlockOrDefault(id);
        const block = new Block(data, position, this.renderer, this.physics);
        this.blocks.push(block);
        return block;
    }

    public handleCollision(blockA: Block, blockB: Block): void {
        if (blockA && blockB && blockA.data.id === blockB.data.id) {
            this.mergeBlocks(blockA, blockB);
        }
    }

    private mergeBlocks(a: Block, b: Block): void {
        const newBlockId = a.data.nextBlockId;
        if (!newBlockId) return;

        const position = {
            x: (a.body.position.x + b.body.position.x) / 2,
            y: (a.body.position.y + b.body.position.y) / 2
        };

        a.body.collisionFilter.mask = 0;
        b.body.collisionFilter.mask = 0;

        this.createBlock(newBlockId, position);

        this.destroyBlock(a);
        this.destroyBlock(b);
    }

    private destroyBlock(block: Block): void {
        block.destroy();
        this.blocks = this.blocks.filter(b => b !== block);
    }

    public updateAll(): void {
        this.blocks.forEach(block => block.update());
    }
}

export default ObjectManager;
