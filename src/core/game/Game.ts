import { Assets, Sprite } from "pixi.js";
import Projection from "../../components/Projection";
import { getBlockOrDefault } from "../../data/blocks";
import Physics from "../physics/Physics";
import Renderer from "../render/Renderer";
import ObjectManager from "../../managers/ObjectManager";
import { getRandomCandyId } from "../../utils/random";
import { Body, Events } from "matter-js";
import { CustomBody } from "../../data/types";

class Game {
    private renderer = new Renderer();
    private physics = new Physics();
    private objects = new ObjectManager(this.renderer, this.physics);
    private projection?: Projection;

    public async initialize(): Promise<void> {
        await this.loadAssets();
        this.addBackground();
        this.createProjection();
        this.setupInput();
        this.setupCollisions();
        this.startGameLoop();
    }

    private async loadAssets(): Promise<void> {
        await Assets.init({ manifest: "/manifest.json" });
        await Assets.loadBundle("candies");
        await Assets.loadBundle("ui");
    }

    // TODO: Move to UI logic
    private addBackground(): void {
        const background = new Sprite(Assets.get("background"));
        background.anchor.set(0.5);
    
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const backgroundWidth = background.texture.width;
        const backgroundHeight = background.texture.height;
    
        if (backgroundWidth && backgroundHeight) {
    
            const scaleX = screenWidth / backgroundWidth;
            const scaleY = screenHeight / backgroundHeight;
    
            const scale = Math.max(scaleX, scaleY);
    
            background.scale.set(scale);
    
            background.position.set(screenWidth / 2, screenHeight / 2);
        }
    
        this.renderer.addToUI(background);
    }

    private createProjection(): void {
        if (this.projection) {
            this.renderer.removeFromUI(this.projection.sprite);
            this.projection.sprite.destroy();
        }
        
        this.projection = new Projection(getBlockOrDefault(getRandomCandyId()));
        this.renderer.addToUI(this.projection.sprite);
    }

    private setupInput(): void {
        this.renderer.app.stage.on("pointermove", (e) => {
            if (this.projection) {
                const localPosition = e.getLocalPosition(this.renderer.app.stage);
                this.projection.updatePosition(localPosition.x);
            }
        });

        this.renderer.app.stage.on("pointerup", () => {
            if (this.projection) {
                this.objects.createBlock(this.projection.getBlockId(), this.projection.getPosition());
                this.createProjection();
            }
        });
    }

    private setupCollisions(): void {
        Events.on(this.physics.engine, "collisionStart", (e) => {
            e.pairs.forEach(pair => {
                if (this.hasBlockLink(pair.bodyA) && this.hasBlockLink(pair.bodyB)) {
                    const blockA = pair.bodyA.blockLink;
                    const blockB = pair.bodyB.blockLink;

                    if (blockA && blockB) {
                        this.objects.handleCollision(blockA, blockB);
                    }
                }
            });
        });
    }

    private startGameLoop(): void {
        this.renderer.app.ticker.add(() => {
            this.physics.update();
            this.objects.updateAll();
        })
    }

    private hasBlockLink(body: Body): body is Body & CustomBody {
        return (body as CustomBody).blockLink !== undefined
    }
}

export default Game;