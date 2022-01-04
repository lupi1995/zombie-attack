import EventListener from "../../core/design-pattern/observer/event-listener";
import CoreEvent from "../../core/evens/core-event";
import GameEvent from "../events/game-event";
import AssetsConfig from "../settings/extend-assets-config";
import GameConfig from "../settings/game-config";


class MenuScenePanel extends EventListener {
    constructor() {
        super();
        var self = this;
        self.register(GameEvent.EnterLoadingScene);

        self.container = document.createElement("div");
        self.container.className = "end-panel";
        self.container.style.position = "fixed";
        self.container.style.width = GameConfig.GameWidth + "px";
        self.container.style.height = GameConfig.GameHeight + "px";
        document.body.appendChild(self.container);

        self.background = new Image();
        self.background.style.width = GameConfig.GameWidth + "px";
        self.background.style.height = GameConfig.GameHeight + "px";
        self.background.src = AssetsConfig.BackgroundURL;
        self.container.appendChild(self.background);

        self.playButton = document.createElement("button");
        self.playButton.style.width = "200px";
        self.playButton.style.height = "70px";
        self.playButton.style.position = "fixed";
        self.playButton.style.top = "300px";
        self.playButton.style.left = GameConfig.GameWidth / 2 - 100 + "px";
        self.playButton.style.color = "red";
        self.playButton.style.fontFamily = "fantasy";
        self.playButton.textContent = "PLAY";
        self.playButton.style.fontSize = "40px";
        self.playButton.onclick = self.play.bind(self);
        self.container.appendChild(self.playButton);
    }

    onEnterLoadingScene(){
        var self = this;
        self.setVisible(false);
    }

    play(){
        var self = this;
        self.notify(GameEvent.Play);
    }

    setVisible(visible) {
        var self = this;
        self.container.style.display = visible ? "block" : "none";
    }

    

}
export default MenuScenePanel;