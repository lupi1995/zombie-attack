import App from "../core/app";
import MainScene from "./scenes/main-scene";
import * as THREE from "three";
import SceneName from "./settings/scene-name";
import ExtendAssetsConfig from "./settings/extend-assets-config";
import EndScene from "./scenes/end-scene";
import MenuScene from "./scenes/menu-scene";
import LoadingScene from "./scenes/loading-scene";
global.DEBUG = false;

App.prototype.addScenes = function(){
    var self = this;
    self.sceneManager.AddScene(MenuScene, SceneName.MenuScene);
    self.sceneManager.AddScene(LoadingScene, SceneName.LoadingScene);
    self.sceneManager.AddScene(MainScene, SceneName.MainScene);
    self.sceneManager.AddScene(EndScene, SceneName.EndScene);
    self.sceneManager.LoadScene(SceneName.MenuScene);
}
export default App;