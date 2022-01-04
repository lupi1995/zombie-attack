import AssetsConfig from "../../core/assets/assets-config";
import AssetsType from "../../core/assets/assets-type";
import SceneName from "./scene-name";
var base64 = ""
AssetsConfig[SceneName.MenuScene] = [
    
]

AssetsConfig[SceneName.MainScene] = [
    { name: "ChinaTown_01", type: AssetsType.Model, path: "./assets/models/ChinaTown_01.glb" },
    { name: "Gun_M249_02", type: AssetsType.Model, path: "./assets/models/Gun_M249_02.glb" },
    { name: "Hand_M249_01", type: AssetsType.Model, path: "./assets/models/Hand_M249_01.glb" },
    { name: "Zombie_Homeless_04", type: AssetsType.Model, path: "./assets/models/Zombie_Homeless_04.glb" },
    { name: "sight", type: AssetsType.Texture, path: "./assets/textures/sight.png" },
    { name: "fire", type: AssetsType.Texture, path: "./assets/textures/fire.png" },
    { name: "gun-shot", type: AssetsType.Sound, path: "./assets/sounds/gun-shot.mp3" }
]

export default AssetsConfig;