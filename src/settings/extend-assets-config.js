import AssetsConfig from "../../core/assets/assets-config";
import AssetsType from "../../core/assets/assets-type";
import SceneName from "./scene-name";

import TownModel from "./assets-base64/town-model";
import HandModel from "./assets-base64/hand-model";
import GunModel from "./assets-base64/gun-model";
import ZombieModel from "./assets-base64/zombie-model";
import TextureSight from "./assets-base64/texture-sight";
import TextureFire from "./assets-base64/texture-fire";
import AudioGunShot from "./assets-base64/audio-gun-shot";
import TextureBackground from "./assets-base64/texture-background";

var USING_EMBEDDED_ASSETS = true; // set false to use load folder assets instead

AssetsConfig.BackgroundURL = "./assets/textures/background.jpg"
AssetsConfig[SceneName.MainScene] = [
    { name: "ChinaTown_01", type: AssetsType.Model, path: "./assets/models/ChinaTown_01.glb" },
    { name: "Gun_M249_02", type: AssetsType.Model, path: "./assets/models/Gun_M249_02.glb" },
    { name: "Hand_M249_01", type: AssetsType.Model, path: "./assets/models/Hand_M249_01.glb" },
    { name: "Zombie_Homeless_04", type: AssetsType.Model, path: "./assets/models/Zombie_Homeless_04.glb" },
    { name: "sight", type: AssetsType.Texture, path: "./assets/textures/sight.png" },
    { name: "fire", type: AssetsType.Texture, path: "./assets/textures/fire.png" },
    { name: "gun-shot", type: AssetsType.Sound, path: "./assets/sounds/gun-shot.mp3" }
]
if (USING_EMBEDDED_ASSETS) {
    AssetsConfig.BackgroundURL = TextureBackground;
    AssetsConfig[SceneName.MainScene] = [
        { name: "ChinaTown_01", type: AssetsType.Model, path: TownModel },
        { name: "Gun_M249_02", type: AssetsType.Model, path: GunModel },
        { name: "Hand_M249_01", type: AssetsType.Model, path: HandModel },
        { name: "Zombie_Homeless_04", type: AssetsType.Model, path: ZombieModel },
        { name: "sight", type: AssetsType.Texture, path: TextureSight },
        { name: "fire", type: AssetsType.Texture, path: TextureFire },
        { name: "gun-shot", type: AssetsType.Sound, path: AudioGunShot }
    ]
}
export default AssetsConfig;