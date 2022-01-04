import SceneEventListener from "../../core/scene/scene-event-listener";
import CoreEvent from "../../core/evens/core-event";
import SceneName from "../settings/scene-name";
import GameEvent from "../events/game-event";
import MenuScenePanel from "../html-ui/menu-scene-panel";

class MenuScene extends SceneEventListener {
    constructor() {
        super();
        var self = this;
        self.register(GameEvent.Play);
        new MenuScenePanel();
        document.body.style.cursor = "auto";
    }

    onPlay(){
        var self = this;
        self.notify(CoreEvent.LoadScene, SceneName.LoadingScene);
    }
}
export default MenuScene;