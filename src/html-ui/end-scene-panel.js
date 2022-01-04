import EventListener from "../../core/design-pattern/observer/event-listener";
import CoreEvent from "../../core/evens/core-event";
import GameEvent from "../events/game-event";
import GameConfig from "../settings/game-config";


class EndScenePanel extends EventListener {
    constructor() {
        super();
        var self = this;

        self.register(GameEvent.EnterEndScene);
        self.register(CoreEvent.GameStart);
        self.register(GameEvent.UpdateScore);

        self.container = document.createElement("div");
        self.container.className = "end-panel";
        self.container.style.position = "fixed";
        self.container.style.width = GameConfig.GameWidth + "px";
        self.container.style.height = GameConfig.GameHeight + "px";
        document.body.appendChild(self.container);

        self.background = new Image();
        self.background.style.width = GameConfig.GameWidth + "px";
        self.background.style.height = GameConfig.GameHeight + "px";
        self.background.src = GameConfig.BackgroundURL;
        self.container.appendChild(self.background);

        self.scorePanel = document.createElement("div");
        self.scorePanel.style.position = "fixed";
        self.scorePanel.style.width = "500px";
        self.scorePanel.style.height = "200px";
        self.scorePanel.style.fontSize = "50px";
        self.scorePanel.style.color = "red";
        self.scorePanel.style.left = GameConfig.GameWidth / 2 - 250 + "px";
        self.scorePanel.style.top = "50px";
        self.scorePanel.textContent = "YOUR SCORE: 0";
        self.scorePanel.style.fontFamily = "fantasy";
        self.scorePanel.style.userSelect = "none";
        self.centerText(self.scorePanel);
        self.container.appendChild(self.scorePanel);

        self.replayButton = document.createElement("button");
        self.replayButton.style.width = "200px";
        self.replayButton.style.height = "70px";
        self.replayButton.style.position = "fixed";
        self.replayButton.style.top = "300px";
        self.replayButton.style.left = GameConfig.GameWidth / 2 - 100 + "px";
        self.replayButton.style.color = "red";
        self.replayButton.style.fontFamily = "fantasy";
        self.replayButton.textContent = "REPLAY";
        self.replayButton.style.fontSize = "40px";
        self.replayButton.onclick = self.replay.bind(self);
        self.container.appendChild(self.replayButton);

        self.setVisible(false);
    }

    replay(){
        var self = this;
        self.notify(GameEvent.Replay);
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

    onUpdateScore(score){
        var self = this;
        self.updateScore(score);
    }

    onEnterEndScene() {
        var self = this;
        self.setVisible(true);
    }

    onGameStart(){
        var self = this;
        self.setVisible(false);
    }

    updateScore(score) {
        var self = this;
        self.scorePanel.textContent = "YOUR SCORE: " + score;
    }

}
export default EndScenePanel;