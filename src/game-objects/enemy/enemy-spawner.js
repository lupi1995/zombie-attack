import ObjectEventListener from "../../../core/design-pattern/observer/object-event-listener";
import Pool from "../../../core/utils/pool";
import Enemy from "./enemy";
import * as THREE from "three";
import GameEvent from "../../events/game-event";
import GameConfig from "../../settings/game-config";

class EnemySpawner extends ObjectEventListener {
    constructor(spawnPositions) {
        super();
        var self = this;
        self.spawnPositions = spawnPositions;
        self.pool = new Pool(Enemy, 200);
        self.scheduleSpawn();
    }

    scheduleSpawn() {
        var self = this;
        setTimeout(() => {
            self.spawn();
            self.scheduleSpawn();
        }, 300);
    }

    spawn() {
        var self = this;
        var enemy = self.pool.Pop();
        if (enemy) {
            var spawnPos = self.spawnPositions[Math.floor(Math.random() * self.spawnPositions.length)];
            enemy.velocity = new THREE.Vector3(5, 0, 0);
            enemy.position.copy(spawnPos);
            enemy.start();
            enemy.EnemyEscape = self.EnemyEscape.bind(self);
            enemy.EnemyDied = self.DestroyEnemy.bind(self);
            self.add(enemy);
        }
    }

    EnemyEscape() {
        var self = this;
        self.notify(GameEvent.EnemyEscape);
        self.DestroyEnemy();
    }

    DestroyEnemy(enemy) {
        var self = this;
        self.pool.Push(enemy);
        self.remove(enemy);
    }
}
export default EnemySpawner;