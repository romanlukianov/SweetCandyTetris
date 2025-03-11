import { Assets, Sprite } from "pixi.js";
import { Vector } from "matter-js";
import { BlockData } from "../data/types";

class Projection {
    public readonly sprite: Sprite;
    private data: BlockData

    constructor(
        data: BlockData
    ) {
        this.data = data;

        this.sprite = new Sprite(Assets.get(data.textureKey));
        this.sprite.anchor.set(0.5);
        this.sprite.alpha = 0.5;
        this.sprite.setSize(this.data.radius * 2, this.data.radius * 2);
        this.resetPosition();
    }

    public getBlockId() : number {
        return this.data.id;
    }

    public getPosition() : Vector {
        return { x: this.sprite.x, y: this.sprite.y };
    }

    public resetPosition(): void {
        this.sprite.position.set(
            ( 10 + window.innerWidth ) / 2,
            100
        );
    }

    public updatePosition(x: number): void {
        this.sprite.x = Math.max(10, Math.min(x, window.innerWidth));
    }
}

export default Projection;