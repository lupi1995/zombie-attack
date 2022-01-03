import ObjectEventListener from "../../../core/design-pattern/observer/object-event-listener";
import GameEvent from "../../events/game-event";
import Pool from "../../../core/utils/pool";
import Bullet from "./bullet";

class BulletSpawner extends ObjectEventListener {
    constructor(scene) {
        super();
        var self = this;
        self.scene = scene;
        self.poolBullet = new Pool(Bullet, 100);
        self.register(GameEvent.PlayerShoot);
    }

    onPlayerShoot() {
        var self = this;
        self.spawn();
    }

    spawn() {
        var self = this;
        var bullet = self.poolBullet.Pop();
        if (bullet) {
            var spawnPos = self.worldToLocal(self.scene.player.GetSpawnBulletPosition());
            bullet.position.copy(spawnPos);
            bullet.DestroyBullet = self.DestroyBullet.bind(self);
            bullet.velocity = self.scene.intersectPoint.clone().sub(bullet.position).normalize().multiplyScalar(100);
            bullet.start();
            self.add(bullet);
            setTimeout(() => {
                self.remove(bullet);
                self.poolBullet.Push(bullet);
            }, 5000);
        }
    }

    DestroyBullet(bullet) {
        var self = this;
        self.poolBullet.Push(bullet);
        self.remove(bullet);
    }

}
export default BulletSpawner;