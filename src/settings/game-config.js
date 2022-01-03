import { Vector3 } from "three";

var GameConfig = {
    GameWidth: global.innerWidth,
    GameHeight: global.innerHeight,
    TextureDivisor: 1000,
    TownModel: "ChinaTown_01",
    GunModel: "Gun_M249_02",
    HandModel: "Hand_M249_01",
    ZombieModel: "Zombie_Homeless_04",
    Sight: "sight",
    Fire: "fire",
    ParticleBullet: {
        Size: 0.1,
        Alpha: 1,
        MaxLife: 0.1,
        Rotation: 2,
        Velocity: new Vector3(0, 0, 0),
        IsRotation: false,
        Num: 3,
        SpriteLink: './assets/textures/fire.png',
    },

    HandModel: "Hand_M249_01",
    ZombieModel: "Zombie_Homeless_04",
    Sight: "sight",
    ZombieAnimationState: "Bip001|Take 001|BaseLayer",
    PlayerPositionX: 70,
    LoseEscapeNumber: 1
}

export default GameConfig;