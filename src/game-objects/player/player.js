import assetsProvider from "../../../core/assets/assets-provider";
import ObjectEventListener from "../../../core/design-pattern/observer/object-event-listener";
import GameConfig from "../../settings/game-config";
import GameEvent from "../../events/game-event";
import { Object3D } from "three";
class Player extends ObjectEventListener {
    constructor() {
        super();
        var self = this;
        self.gun = assetsProvider.GetModel(GameConfig.GunModel);
        self.add(self.gun);
        self.hand = assetsProvider.GetModel(GameConfig.HandModel);
        self.hand.position.set(-0.03, -1.45, -0.09);
        self.hand.children[0].children[3].frustumCulled = false;
        self.add(self.hand);
        self.spawnTarget = new Object3D();
        self.spawnTarget.position.set(0, 0.12, 0.7);
        self.spawnTarget.visible = false;
        self.add(self.spawnTarget);

        global.addEventListener("mousedown", self.startShooting.bind(self));
        global.addEventListener("mouseup", self.stopShooting.bind(self));

    }

    stopShooting() {
        var self = this;
        clearTimeout(self.shootingTimeOut);
    }

    GetSpawnBulletPosition() {
        var self = this;
        return self.localToWorld(self.spawnTarget.position.clone());
    }

    GetFireBulletPosition() {
        var self = this;
        return self.spawnTarget.position.clone();
    }

    startShooting() {
        var self = this;
        self.notify(GameEvent.PlayerShoot);
        self.shootingTimeOut = setTimeout(() => {
            self.startShooting();
        }, 100);
    }
}
export default Player;