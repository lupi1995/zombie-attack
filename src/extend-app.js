import App from "../core/app";
import MainScene from "./scenes/main-scene";
import * as THREE from "three";
import SceneName from "./settings/scene-name";
import ExtendAssetsConfig from "./settings/extend-assets-config";
import EndScene from "./scenes/end-scene";

global.DEBUG=false;
class ExtendApp extends App {
    constructor(width, height) {
        super(width, height);
        var self = this;
    }

    addScenes() {
        var self = this;
        self.sceneManager.AddScene(MainScene, SceneName.MainScene);
        self.sceneManager.AddScene(EndScene, SceneName.EndScene);
        self.sceneManager.LoadScene(SceneName.MainScene);
    }
}
export default ExtendApp;