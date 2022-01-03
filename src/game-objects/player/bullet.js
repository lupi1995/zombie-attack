import * as THREE from "three";

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
        self.canCollide = false;
        self.DestroyBullet(self);
    }
}
export default Bullet;