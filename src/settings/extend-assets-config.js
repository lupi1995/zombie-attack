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
import AudioBackground from "./assets-base64/audio-background";
import AudioBulletImpact from "./assets-base64/audio-bullet-impact";
import AudioZombieDie from "./assets-base64/audio-zombie-die";
global.USING_EMBEDDED_ASSETS = true;
AssetsConfig.BackgroundURL = "./assets/textures/background.jpg"
AssetsConfig[SceneName.MainScene] = [
    { name: "ChinaTown_01", type: AssetsType.Model, path: "./assets/models/ChinaTown_01.glb" },
    { name: "Gun_M249_02", type: AssetsType.Model, path: "./assets/models/Gun_M249_02.glb" },
    { name: "Hand_M249_01", type: AssetsType.Model, path: "./assets/models/Hand_M249_01.glb" },
    { name: "Zombie_Homeless_04", type: AssetsType.Model, path: "./assets/models/Zombie_Homeless_04.glb" },
    { name: "sight", type: AssetsType.Texture, path: "./assets/textures/sight.png" },
    { name: "fire", type: AssetsType.Texture, path: "./assets/textures/fire.png" },
    { name: "gun-shot", type: AssetsType.Sound, path: "./assets/sounds/gun-shot.mp3" },
    { name: "bullet-impact", type: AssetsType.Sound, path: "./assets/sounds/bullet-impact.mp3" },
    { name: "zombie-die", type: AssetsType.Sound, path: "./assets/sounds/zombie-die.mp3" },
    { name: "background-music", type: AssetsType.Sound, path: "./assets/sounds/background-music.mp3" }
]
if (global.USING_EMBEDDED_ASSETS) {
    AssetsConfig.BackgroundURL = TextureBackground;
    AssetsConfig[SceneName.MenuScene] = [
        { name: "background", type: AssetsType.Texture, path: TextureBackground }
    ]
    AssetsConfig[SceneName.MainScene] = [
        { name: "ChinaTown_01", type: AssetsType.Model, path: TownModel },
        { name: "Gun_M249_02", type: AssetsType.Model, path: GunModel },
        { name: "Hand_M249_01", type: AssetsType.Model, path: HandModel },
        { name: "Zombie_Homeless_04", type: AssetsType.Model, path: ZombieModel },
        { name: "sight", type: AssetsType.Texture, path: TextureSight },
        { name: "fire", type: AssetsType.Texture, path: TextureFire },
        { name: "gun-shot", type: AssetsType.Sound, path: AudioGunShot },
        { name: "bullet-impact", type: AssetsType.Sound, path: AudioBulletImpact },
        { name: "zombie-die", type: AssetsType.Sound, path: AudioZombieDie },
        { name: "background-music", type: AssetsType.Sound, path: AudioBackground }
    ]
}
export default AssetsConfig;