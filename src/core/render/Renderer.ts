import { Application, Container, ContainerChild } from "pixi.js";

class Renderer {
    public readonly app: Application;
    private readonly gameLayer: Container;
    private readonly uiLayer: Container;

    constructor() {
        this.app = new Application();
        this.gameLayer = new Container();
        this.uiLayer = new Container();

        this.initApp();
    }

    private async initApp() : Promise<void> {
        await this.app.init({
            resizeTo: window,
            backgroundColor: 0xcccccc,
            antialias: true
        });

        document.body.appendChild(this.app.canvas);

        this.app.stage.addChild(this.uiLayer);
        this.app.stage.addChild(this.gameLayer);

        this.app.stage.eventMode = "static";
        this.app.stage.hitArea = this.app.screen;
    }

    addToGame(object: ContainerChild): void {
        this.gameLayer.addChild(object);
    }

    addToUI(object: ContainerChild): void {
        this.uiLayer.addChild(object);
    }

    removeFromGame(object: ContainerChild): void {
        this.gameLayer.removeChild(object);
    }

    removeFromUI(object: ContainerChild): void {
        this.uiLayer.removeChild(object);
    }
}

export default Renderer;