import App from "./extend-app";
import GameConfig from "./settings/game-config";
const app = new App(GameConfig.GameWidth, GameConfig.GameHeight)
app.StartAnimating()