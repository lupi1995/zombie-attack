import Enum from "../../core/utils/enum";

var GameEvent = {};
new Enum(GameEvent, [
    "PlayerShoot",
    "EnemyEscape",
    "EnterEndScene",
    "UpdateLife",
    "UpdateScore",
    "GainScore",
    "Replay",
    "Play",
    "EnterLoadingScene"
]);
export default GameEvent;