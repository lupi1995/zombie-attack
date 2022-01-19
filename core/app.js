import * as THREE from "three";
import EventListener from "./design-pattern/observer/event-listener";
import CoreEvent from "./evens/core-event";
import SceneManager from "./scene/scene-manager";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

global.DEBUG = true;
class App extends EventListener {
    constructor(width, height) {
        super();
        var self = this;
        self.frameCount = 0;
        self.then = performance.now();
        self.elapsed = 0;
        self.fps = 60;
        self.fpsInterval = 1000 / self.fps;
        self.startTime = self.then;
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
        self.forceHideCursor = false;
        global.addEventListener("resize", self.onResize.bind(self));

        self.sceneManager = new SceneManager();
        self.register(CoreEvent.CreateScene);
        self.register(CoreEvent.GameOver);
        self.register(CoreEvent.GameStart);
        self.register(CoreEvent.LoadScene);
        self.addScenes();
        self.addKeyEvent();
    }

    addKeyEvent() {
        var self = this;
        if (global.DEBUG) {
            global.addEventListener("keydown", (e) => {
                if (e.key == "Control") {
                    self.controls.enabled = true;
                    self.transformControls.enabled = false;
                }
            });
            global.addEventListener("keyup", (e) => {
                if (e.key == "Control") {
                    self.controls.enabled = false;
                    self.transformControls.enabled = true;
                }
            });

        }
    }

    addHelper() {
        var self = this;
        if (global.DEBUG) {
            self.controls = new OrbitControls(self.scene.camera, self.renderer.domElement);
            self.transformControls = new TransformControls(self.scene.camera, self.renderer.domElement);
            self.controls.enabled = false;
            self.transformControls.attach(self.scene.light)
            self.scene.add(self.transformControls);
            self.scene.add(new THREE.AxesHelper(500));

        }
    }

    onCreateScene(data) {
        var self = this;
        self.scene = data.scene;
        self.pause = false;

        self.addHelper();
    }

    onGameOver() {
        var self = this;
        document.body.style.cursor = "auto";
        self.pause = true;
        self.forceHideCursor = false;
    }

    onGameStart() {
        var self = this;
        self.pause = false;
        //document.body.style.cursor = "none";
        self.forceHideCursor = true;
    }

    onLoadScene(sceneName) {
        var self = this;
        self.sceneManager.LoadScene(sceneName);
    }

    addScenes() {
        var self = this;

    }

    resetTime() {
        var self = this;
        self.startTime = performance.now();
        self.then = performance.now();
        self.frameCount = 0;
        self.isLostFocus = false;
        self.forceHideCursor && (document.body.style.cursor = "none");
    }

    onLostFocus() {
        var self = this;
        self.isLostFocus = true;
        self.forceHideCursor && (document.body.style.cursor = "auto");
    }

    StartAnimating() {
        var self = this;
        global.addEventListener("focus", self.resetTime.bind(self));
        global.addEventListener("blur", self.onLostFocus.bind(self));

        self.resetTime();
        self.update();
    }

    update() {
        var self = this;
        requestAnimationFrame(self.update.bind(self));
        if (self.isLostFocus || self.pause) return;
        var now = performance.now();
        self.elapsed = now - self.then;
        var sinceStart = now - self.startTime;
        var deltaTime = Math.round(sinceStart / ++self.frameCount) / 1000;
        self.controls && self.controls.update();
        if (self.scene) {
            self.scene.Update(deltaTime);
            self.scene.UpdateChildren(deltaTime);
        }
        if (self.elapsed > self.fpsInterval) {
            self.then = now - (self.elapsed % self.fpsInterval);
            self.scene && self.render();
        }

    }

    render() {
        var self = this;
        if (self.resizeRendererToDisplaySize()) {
            var canvas = self.renderer.domElement;
            self.scene.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            self.scene.camera.updateProjectionMatrix();
        }
        self.renderer.render(self.scene, self.scene.camera);
    }

    onResize() {
        var self = this;
        self.notify(CoreEvent.Resize, { width: window.innerWidth, height: window.innerHeight });
    }

    resizeRendererToDisplaySize() {
        var self = this;
        var canvas = self.renderer.domElement;
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;
        var needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            self.renderer.setSize(width, height, false);
        }
        return needResize;
    }
}
export default App;