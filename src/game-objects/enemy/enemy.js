import * as THREE from "three";
import assetsProvider from "../../../core/assets/assets-provider";
import ObjectEventListener from "../../../core/design-pattern/observer/object-event-listener";
import GameConfig from "../../settings/game-config";
import { AnimationUtils } from "three";
import { LoopRepeat, LoopOnce } from "three/src/constants";
import GameEvent from "../../events/game-event";

class Enemy extends ObjectEventListener {
    constructor() {
        super();
        var self = this;

        self.escaped = false;
        self.PlayerAttacked = (enemy) => { };
        self.display = assetsProvider.GetModel(GameConfig.ZombieModel);
        self.display.rotation.y = Math.PI / 2;
        self.add(self.display);
        self.mixer = new THREE.AnimationMixer(self.display);
        self.runClip = AnimationUtils.subclip(self.display.animations[0], GameConfig.ZombieAnimationState, 0, 26);
        self.dieClip = AnimationUtils.subclip(self.display.animations[0], GameConfig.ZombieAnimationState, 26, 63);

        global.a = self.display.animations[0].clone();
        global.b = self.display.animations[0].clone();
        self.createGhostMesh();
        self.EnemyEscape = () => { };
        self.audioListener = new THREE.AudioListener();
        self.add(self.audioListener);
        self.soundShoot = new THREE.Audio(self.audioListener);
        self.soundShoot.setBuffer(assetsProvider.GetSound(GameConfig.AudioZombieDie));
        self.soundShoot.setVolume(0.5);
    }

    start() {
        var self = this;
        self.animation = self.mixer.clipAction(self.runClip);
        self.animation.setLoop(LoopRepeat, Infinity);
        self.animation.play();
        self.canCollide = true;
        self.escaped = false;
    }

    createGhostMesh() {
        var self = this;
        var geometry = new THREE.BoxGeometry(1, 3.5, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        self.cube = new THREE.Mesh(geometry, material);
        self.cube.visible = false;
        self.add(self.cube);
    }

    Update(dt) {
        var self = this;
        if (self.escaped) return;

        self.mixer.update(dt);
        self.position.add(self.velocity.clone().multiplyScalar(dt));
        if (self.position.x >= GameConfig.PlayerPositionX) {
            self.escaped = true;
            self.EnemyEscape(self);
        }
    }

    OnCollisionEnter() {
        var self = this;
        if (!self.visible && !self.canCollide) return;
        self.animation.stop();
        self.animation = self.mixer.clipAction(self.dieClip);
        self.animation.setLoop(LoopOnce, 1);
        self.animation.clampWhenFinished = true;
        self.animation.play();
        self.velocity.set(0, 0, 0);
        self.canCollide = false;
        self.notify(GameEvent.GainScore, GameConfig.ScorePerEnemy);
        self.soundShoot.play();
        setTimeout(() => {
            self.Reset();
            self.EnemyDied(self);
        }, 3000);
    }

    Reset() {
        var self = this;
        self.animation.stop();
    }
}
export default Enemy;