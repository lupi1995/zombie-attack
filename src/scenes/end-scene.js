import CoreEvent from "../../core/evens/core-event";
import SceneEventListener from "../../core/scene/scene-event-listener";
import GameEvent from "../events/game-event";
import SceneName from "../settings/scene-name";

class EndScene extends SceneEventListener {
    constructor() {
        super();
        var self = this;
        self.notify(GameEvent.EnterEndScene);
        self.register(GameEvent.Replay);
    }

    onReplay() {
        var self = this;
        self.notify(CoreEvent.LoadScene, SceneName.MainScene);
    }
}
export default EndScene;