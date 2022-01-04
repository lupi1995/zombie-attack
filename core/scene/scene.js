
import * as THREE from "three";

class Scene extends THREE.Scene {
    constructor() {
        super();
        var self = this;
        self.camera = new THREE.PerspectiveCamera(50, global.innerWidth / global.innerHeight, 0.1, 1000);
        self.background = new THREE.Color(0xAAAAAA);
    }

    SetVisible(visible) {
        var self = this;
        self.visible = visible;
    }

    Destroy() {
        var self = this;
        self.SetVisible(false);
    }
}
export default Scene;