import EventListener from "../design-pattern/observer/event-listener";
import CoreEvent from "../evens/core-event";
import AssetsLoader from "../assets/assets-loader";

class SceneManager extends EventListener {
    constructor() {
        super();
        var self = this;
        self.templates = {};
        self.currentScene = null;
        self.prevScene = null;
        self.assetsLoader = new AssetsLoader();
    }

    createScene(Template) {
        var self = this;
        var scene = new Template();
        self.prevScene = self.currentScene;
        self.prevScene && self.prevScene.Destroy(false);
        self.prevScene = null;
        self.currentScene = scene;
        self.currentScene.SetVisible(true);
        self.notify(CoreEvent.CreateScene, { scene: self.currentScene });
    }

    AddScene(template, sceneName) {
        var self = this;
        self.templates[sceneName] = template;
    }

    async LoadScene(sceneName) {
        var self = this;
        await self.assetsLoader.LoadAssets(sceneName);
        self.LoadSceneComplete(sceneName);
    }

    LoadSceneComplete(sceneName) {
        var self = this;
        self.createScene(self.templates[sceneName]);
    }
}
export default SceneManager;