import Enum from "../utils/enum";

var CoreEvent = {};
new Enum(CoreEvent, [
    "CreateScene",
    "PauseGame",
    "GameOver",
    "GameStart",
    "LoadScene",
    "Resize"
]);

export default CoreEvent;