import EventListener from "../../core/design-pattern/observer/event-listener";
import CoreEvent from "../../core/evens/core-event";
import GameEvent from "../events/game-event";
import AssetsConfig from "../settings/extend-assets-config";
import GameConfig from "../settings/game-config";


class LoadingScenePanel extends EventListener {
    constructor() {
        super();
        var self = this;
        self.register(CoreEvent.GameStart);
        self.register(GameEvent.EnterLoadingScene);

        self.container = document.createElement("div");
        self.container.className = "loading-panel";
        self.container.style.position = "fixed";
        self.container.style.width = GameConfig.GameWidth + "px";
        self.container.style.height = GameConfig.GameHeight + "px";
        self.container.style.backgroundColor = "#131B34";
        document.body.appendChild(self.container);

        self.loadingText = document.createElement("div");
        self.loadingText.style.position = "fixed";
        self.loadingText.style.width = "300px";
        self.loadingText.style.height = "100px";
        self.loadingText.style.fontSize = "50px";
        self.loadingText.style.color = "red";
        self.loadingText.style.left = GameConfig.GameWidth / 2 - 150 + "px";
        self.loadingText.style.top = GameConfig.GameHeight / 2 - 50 + "px";
        self.loadingText.textContent = "LOADING...";
        self.loadingText.style.fontFamily = "fantasy";
        self.loadingText.style.userSelect = "none";
        self.centerText(self.loadingText);
        self.container.appendChild(self.loadingText);
        self.setVisible(false);
    }

    onEnterLoadingScene(){
        var self = this;
        self.setVisible(true);
    }

    onGameStart(){
        var self = this;
        self.setVisible(false);
    }

    play(){
        var self = this;
        self.notify(GameEvent.Play);
    }

    centerText(divElement) {
        var self = this;
        divElement.style.display = "flex";
        divElement.style.justifyContent = "center";
        divElement.style.alignItems = "center";
    }

    setVisible(visible) {
        var self = this;
        self.container.style.display = visible ? "block" : "none";
    }

    

}
export default LoadingScenePanel;