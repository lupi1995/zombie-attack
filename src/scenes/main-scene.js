
import SceneEventListener from "../../core/scene/scene-event-listener";
import * as THREE from "three";
import GameConfig from "../settings/game-config";
import assetsProvider from "../../core/assets/assets-provider";
import Player from "../game-objects/player/player";
import GameEvent from "../events/game-event";
import Pool from "../../core/utils/pool";
import Bullet from "../game-objects/player/bullet";
import BulletSpawner from "../game-objects/player/bullet-spawner";
import EnemySpawner from "../game-objects/enemy/enemy-spawner";
import ParticleSystem from "../game-objects/particle/particle-system";
import CollisionUtils from "../../core/utils/collision-utils";
import CoreEvent from "../../core/evens/core-event";
import SceneName from "../settings/scene-name";

class MainScene extends SceneEventListener {
    constructor() {
        super();
        var self = this;

        self.town = null;
        self.player = null;
        self.poolBullet = null;
        self.particleFire = null;
        self.totalEnemyEscaped = 0;

        self.init();
        self.addLights();
        self.register(GameEvent.PlayerShoot);
        self.register(GameEvent.EnemyEscape);
        self.notify(CoreEvent.GameStart);
    }

    init() {
        var self = this;
        self.camera = new THREE.PerspectiveCamera(50, GameConfig.GameWidth / GameConfig.GameHeight, 0.1, 1000);
        self.camera.position.set(69.14515045582493, 7.410359567433639, -26.747926079875867);
        self.camera.rotation.set(-1.9148102974773085, 1.4031673300296512, 1.9193167100106272);

        self.town = assetsProvider.GetModel(GameConfig.TownModel);
        self.add(self.town);

        self.player = new Player();
        self.player.position.set(68.5500, 7, -27.2);
        self.player.rotation.x = Math.PI / 15;
        self.player.rotation.y = -Math.PI / 2;
        self.add(self.player);

        self.raycaster = new THREE.Raycaster();
        global.raycaster = self.raycaster;
        self.mouse = new THREE.Vector2();
        self.plane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
        self.intersectPoint = new THREE.Vector3();//for reuse

        var material = assetsProvider.GetTexture(GameConfig.Sight);
        self.sight = new THREE.Sprite(material);
        self.sight.position.set(self.camera.position.x - 2, self.camera.position.y, self.camera.position.z);
        self.sight.scale.set(material.map.image.width / GameConfig.TextureDivisor / 5, material.map.image.height / GameConfig.TextureDivisor / 5, 1);
        self.add(self.sight);
        global.addEventListener("mousemove", self.onMouseMove.bind(self));
        self.bulletSpawner = new BulletSpawner(self);
        self.add(self.bulletSpawner);
        self.enemySpawner = new EnemySpawner([new THREE.Vector3(-19.115, 0, -26),
        new THREE.Vector3(-19.115, 0, -27),
        new THREE.Vector3(-19.115, 0, -28),
        new THREE.Vector3(-19.115, 0, -29),
        new THREE.Vector3(-19.115, 0, -30),
        new THREE.Vector3(-19.115, 0, -31),
        new THREE.Vector3(-19.115, 0, -32)]);
        self.add(self.enemySpawner);

        self.particleFire = new ParticleSystem({
            parent: self,
            camera: self.camera,
            info: GameConfig.ParticleBullet,
            texture: assetsProvider.GetTexture(GameConfig.Fire).map
        });
    }

    onPlayerShoot() {
        var self = this;
        self.particleFire.AddParticles(this.player.GetSpawnBulletPosition());
    }

    onEnemyEscape() {
        var self = this;
        self.totalEnemyEscaped++;
        if (self.totalEnemyEscaped >= GameConfig.LoseEscapeNumber) {
            self.notify(CoreEvent.GameOver);
            self.notify(CoreEvent.LoadScene, SceneName.EndScene);
        }
    }

    Update(dt) {
        var self = this;
        self.updateRaycast();
        self.particleFire.Update(dt);
        self.checkCollision();
    }

    checkCollision() {
        var self = this;
        var bullets = self.bulletSpawner.children;
        var enemies = self.enemySpawner.children;
        for (let i = 0; i < bullets.length; i++) {
            var bullet = bullets[i];
            for (let j = 0; j < enemies.length; j++) {
                var enemy = enemies[j]
                if (bullet.canCollide && enemy.canCollide) {
                    if (CollisionUtils.DetectCollisionCubes(bullet.display, enemy.cube)) {
                        i--;
                        bullet.OnCollisionEnter(enemy);
                        enemy.OnCollisionEnter(bullet);
                        break;
                    }
                }
            }
        }
    }

    updateRaycast() {
        var self = this;

        self.raycaster.setFromCamera(self.mouse, self.camera);
        var result = [];
        self.raycaster.intersectObjects([self.town, ...self.enemySpawner.children], true, result);
        if (result.length > 0) {
            self.intersectPoint = result[0].point.clone();
        } else {
            self.raycaster.ray.intersectPlane(self.plane, self.intersectPoint); // find the point of intersection
        }
        self.sight.position.copy(self.camera.position.clone().add(self.raycaster.ray.direction.normalize().multiplyScalar(2)));
        self.player.lookAt(self.intersectPoint);
    }

    onMouseMove(event) {
        var self = this;

        self.mouse.x = (event.clientX / global.innerWidth) * 2 - 1;
        self.mouse.y = - (event.clientY / global.innerHeight) * 2 + 1;
    }

    addLights() {
        var self = this;
        var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        var light = new THREE.AmbientLight(0xFFFFFF, 2); // soft white light
        self.add(light);
        self.add(directionalLight);
    }
}
export default MainScene;