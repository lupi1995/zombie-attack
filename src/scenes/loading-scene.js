import CoreEvent from "../../core/evens/core-event";
import SceneName from "../settings/scene-name";
import SceneEventListener from "../../core/scene/scene-event-listener";
import MainScenePanel from "../html-ui/main-scene-panel";
import EndScenePanel from "../html-ui/end-scene-panel";
import GameEvent from "../events/game-event";

class LoadingScene extends SceneEventListener {
    constructor() {
        super();
        var self = this;
        new MainScenePanel();
        new EndScenePanel();
        self.notify(GameEvent.EnterLoadingScene);
        self.notify(CoreEvent.LoadScene,SceneName.MainScene);
    }
}
export default LoadingScene;