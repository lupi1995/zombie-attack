import * as THREE from "three";
import EventListener from "event-listener";
import CoreEvent from "core-event";
import SceneManager from "scene-manager";
import ScaleManager from "scale-manager";
import FPSController from "fps-controller";

global.DEBUG = true;
class App extends EventListener {
    constructor(width, height) {
        super();
        var self = this;
        self.scaleManager = new ScaleManager(self);
        self.sceneManager = new SceneManager();
        self.fpsController = new FPSController(self);

        self.scene = null;
        self.canvas = document.querySelector("canvas.webgl");
        self.canvas.width = width;
        self.canvas.height = height;
        self.renderer = new THREE.WebGLRenderer({ canvas: self.canvas, alpha: false, antialias: true });
        self.renderer.setPixelRatio(window.devicePixelRatio);
        self.renderer.outputEncoding = THREE.sRGBEncoding;
        self.renderer.shadowMap.enabled = true;
        self.renderer.setSize(width, height);
        document.body.appendChild(self.renderer.domElement);

        self.register(CoreEvent.CreateScene);
        self.register(CoreEvent.GameOver);
        self.register(CoreEvent.GameStart);
        self.register(CoreEvent.LoadScene);
        self.addScenes();
    }

    onCreateScene(data) {
        var self = this;
        self.scene = data.scene;
        self.pause = false;
    }

    onGameOver() {
        var self = this;
        self.pause = true;
    }

    onGameStart() {
        var self = this;
        self.pause = false;
    }

    onLoadScene(sceneName) {
        var self = this;
        self.sceneManager.LoadScene(sceneName);
    }

    addScenes() {
        var self = this;

    }

    StartAnimating() {
        var self = this;
        self.fpsController.Start();
    }

    IsPaused() {
        var self = this;
        return self.pause;
    }

    Update(deltaTime) {
        var self = this;
        if (self.scene) {
            self.scene.Update(deltaTime);
            self.scene.UpdateChildren(deltaTime);
        }
    }

    AllowRendering() {
        var self = this;
        return !!self.scene;
    }

    Render() {
        var self = this;
        self.renderer.render(self.scene, self.scene.camera);
    }

    OnResize(scaleInfo) {
        var self = this;
        self.canvas.width = scaleInfo.width;
        self.canvas.height = scaleInfo.height;
        self.renderer.setSize(scaleInfo.width, scaleInfo.height, false);
        if (self.scene) {
            self.scene.camera.aspect = scaleInfo.width / scaleInfo.height;
            self.scene.camera.updateProjectionMatrix();
        }
        self.notify(CoreEvent.Resize, scaleInfo);
    }
}
export default App;