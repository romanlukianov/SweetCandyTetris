import { Bodies, Body, Vector } from "matter-js";
import { Assets, Sprite } from "pixi.js";
import Renderer from "../core/render/Renderer";
import { BlockData, CustomBody } from "../data/types";
import Physics from "../core/physics/Physics";
import { COLLISION_CATEGORIES } from "../data/constants";

class Block {
    public readonly body: Body;
    public readonly sprite: Sprite;
    private readonly physics: Physics;
    private readonly renderer: Renderer;

    constructor(
        public readonly data: BlockData,
        position: Vector,
        renderer: Renderer,
        physics: Physics
    ) {
        this.physics = physics;
        this.renderer = renderer;

        const bodyOptions: CustomBody = {
            restitution: 0.2,
            blockLink: this,
            collisionFilter: {
                category: COLLISION_CATEGORIES.BLOCK,
                mask: COLLISION_CATEGORIES.BLOCK | COLLISION_CATEGORIES.WALL,
            }
        }

        this.body = Bodies.circle(
            position.x,
            position.y,
            data.radius,
            bodyOptions
        );

        physics.addBody(this.body);

        this.sprite = new Sprite(Assets.get(data.textureKey));
        this.sprite.anchor.set(0.5);
        this.sprite.setSize(this.data.radius * 2, this.data.radius * 2);
        this.sprite.position.copyFrom(position);

        this.renderer.addToGame(this.sprite);
    }

    public update(): void {
        this.sprite.position.set(
            this.body.position.x,
            this.body.position.y
        );
        this.sprite.rotation = this.body.angle;
    }

    public destroy(): void {
        this.renderer.removeFromGame(this.sprite);
        this.sprite.destroy();
        this.physics.removeBody(this.body);
    }
}

export default Block;