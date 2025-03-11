import Game from './core/game/Game';
import './style.css'


if (import.meta.env.MODE === "development") {
    window.game = new Game();
    window.game.initialize();
    console.log("GAME STARTED IN DEV MODE");
}
else {
    new Game().initialize();
}
