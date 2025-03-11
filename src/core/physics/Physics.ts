import { Body, Engine, Composite, Bodies } from "matter-js";


class Physics {
    public readonly engine: Engine;
    private walls: Body[] = [];

    constructor() {
        this.engine = Engine.create();
        this.engine.gravity.y = 0.8;
        this.createWalls();
    }

    private createWalls(): void {
        const { innerWidth: width, innerHeight: height } = window;
        
        // TODO: FIX MAGIC NUMBERS
        this.walls = [
            Bodies.rectangle(0, height/2, 20, height, { isStatic: true }),
            Bodies.rectangle(width+10, height/2, 20, height, { isStatic: true }),
            Bodies.rectangle(width/2, height+10, width, 20, { isStatic: true })
        ];
        Composite.add(this.engine.world, this.walls);
    }

    addBody(body: Matter.Body): void {
        Composite.add(this.engine.world, body);
    }

    removeBody(body: Matter.Body): void {
        Composite.remove(this.engine.world, body);
    }

    update(): void {
        Engine.update(this.engine);
    }
}

export default Physics;