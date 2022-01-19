import App from "app";
import GameConfig from "game-config";
import "../webpack-settings/auto-import";  

const app = new App(GameConfig.GameWidth, GameConfig.GameHeight)
app.StartAnimating()
