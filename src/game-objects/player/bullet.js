import * as THREE from "three";
import assetsProvider from "../../../core/assets/assets-provider";
import GameConfig from "../../settings/game-config";

class Bullet extends THREE.Object3D {
    constructor() {
        super();
        var self = this;
        self.display = new THREE.Mesh(
            new THREE.SphereGeometry(0.02, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        self.add(self.display);
        self.velocity = new THREE.Vector3();
        self.DestroyBullet = () => { };

        self.audioListener = new THREE.AudioListener();
        self.add(self.audioListener);
        self.soundShoot = new THREE.Audio(self.audioListener);
        self.soundShoot.setBuffer(assetsProvider.GetSound(GameConfig.AudioBulletImpact));
        self.soundShoot.setVolume(0.5);
    }

    Update(dt) {
        var self = this;
        self.position.add(self.velocity.clone().multiplyScalar(dt));
    }

    start() {
        var self = this;
        self.canCollide = true;
    }

    OnCollisionEnter() {
        var self = this;
        if (!self.visible && !self.canCollide) return;
        self.canCollide = false;
        self.soundShoot.play();
        self.DestroyBullet(self);
    }
}
export default Bullet;