import EventListener from "../../core/design-pattern/observer/event-listener";
import CoreEvent from "../../core/evens/core-event";
import GameEvent from "../events/game-event";
import GameConfig from "../settings/game-config";


class MainScenePanel extends EventListener {
    constructor() {
        super();
        var self = this;

        self.register(CoreEvent.GameStart);
        self.register(GameEvent.EnterEndScene);
        self.register(GameEvent.UpdateLife);
        self.register(GameEvent.UpdateScore);

        self.container = document.createElement("div");
        self.container.className = "main-panel";
        self.container.style.position = "fixed";
        self.container.style.width = GameConfig.GameHeight + "px";
        self.container.style.height = GameConfig.GameHeight + "px";
        document.body.appendChild(self.container);

        self.totalEscapedPanel = document.createElement("div");
        self.totalEscapedPanel.style.position = "fixed";
        self.totalEscapedPanel.style.width = "300px";
        self.totalEscapedPanel.style.height = "100px";
        self.totalEscapedPanel.style.fontSize = "50px";
        self.totalEscapedPanel.style.color = "red";
        self.totalEscapedPanel.style.left = "100px";
        self.totalEscapedPanel.style.top = "0px";
        self.totalEscapedPanel.textContent = "LIFE: 50";
        self.totalEscapedPanel.style.fontFamily = "fantasy";
        self.totalEscapedPanel.style.userSelect = "none";
        self.centerText(self.totalEscapedPanel);
        self.container.appendChild(self.totalEscapedPanel);

        self.scorePanel = document.createElement("div");
        self.scorePanel.style.position = "fixed";
        self.scorePanel.style.width = "300px";
        self.scorePanel.style.height = "100px";
        self.scorePanel.style.fontSize = "50px";
        self.scorePanel.style.color = "red";
        self.scorePanel.style.left = global.innerWidth / 2 - 150 + "px";
        self.scorePanel.style.top = "0px";
        self.scorePanel.textContent = "SCORE: 50";
        self.scorePanel.style.fontFamily = "fantasy";
        self.scorePanel.style.userSelect = "none";
        self.centerText(self.scorePanel);
        self.container.appendChild(self.scorePanel);
        self.setVisible(false);
    }

    setVisible(visible) {
        var self = this;
        self.container.style.display = visible ? "block" : "none";
    }

    centerText(divElement) {
        var self = this;
        divElement.style.display = "flex";
        divElement.style.justifyContent = "center";
        divElement.style.alignItems = "center";
    }

    onGameStart() {
        var self = this;
        self.updateLife(GameConfig.LoseEscapeNumber);
        self.updateScore(0);
        self.setVisible(true);
    }

    onEnterEndScene() {
        var self = this;
        self.setVisible(false);
    }

    onUpdateLife(life) {
        var self = this;
        self.updateLife(life);
    }

    onUpdateScore(score) {
        var self = this;
        self.updateScore(score);
    }

    updateLife(life) {
        var self = this;
        self.totalEscapedPanel.textContent = "LIFE: " + life;
    }

    updateScore(score) {
        var self = this;
        self.scorePanel.textContent = "SCORE: " + score;
    }

}
export default MainScenePanel;