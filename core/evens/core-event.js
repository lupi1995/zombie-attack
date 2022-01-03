import Enum from "../utils/enum";

var CoreEvent = {};
new Enum(CoreEvent, [
    "CreateScene",
    "PauseGame",
    "GameOver",
    "GameStart",
    "LoadScene"
]);

export default CoreEvent;