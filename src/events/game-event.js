import Enum from "../../core/utils/enum";

var GameEvent = {};
new Enum(GameEvent, [
    "PlayerShoot",
    "EnemyEscape"
]);
export default GameEvent;