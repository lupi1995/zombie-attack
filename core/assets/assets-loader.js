import AssetsConfig from "./assets-config";
import AssetsType from "./assets-type";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import assetsProvidder from "./assets-provider";
import { ObjectLoader, TextureLoader, SpriteMaterial, AudioLoader } from "three";
import TextureAtlas from "./texture-atlas";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/dracoloader";

class AssetsLoader {
    constructor() {
        var self = this;
        var dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('../../node_modules/three/examples/js/libs/draco/gltf/');
        self.modelLoader = new GLTFLoader();
        self.modelLoader.setDRACOLoader(dracoLoader)
        self.objectLoader = new ObjectLoader();
        self.textureLoader = new TextureLoader();
        self.audioLoader = new AudioLoader();
    }

    async LoadAssets(sceneName) {
        var self = this;
        if (!AssetsConfig[sceneName] || AssetsConfig[sceneName].length == 0) {
            return;
        }
        var promises = [];
        AssetsConfig[sceneName].forEach(asset => {
            switch (asset.type) {
                case AssetsType.Model:
                    promises.push(self.LoadModel(asset));
                    break;
                case AssetsType.Texture:
                    promises.push(self.LoadTexture(asset));
                    break;
                case AssetsType.Sound:
                    promises.push(self.LoadAudio(asset));
                    break;
                case AssetsType.TPS:
                    promises.push(self.LoadTPS(asset));
                    break;
                default:
                    break;
            }
        });

        await Promise.all(promises);
    }

    LoadModel(asset) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.modelLoader.load(asset.path, function (gltf) {
                gltf.scene.traverse(child => {
                    child.material && (child.material.metalness = 0)
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                gltf.animations.length > 0 && gltf.scene.animations.push(...gltf.animations);

                assetsProvidder.AddModel(asset.name, gltf.scene);
                resolve();
            }, undefined, (error) => {
                console.error(error);
                reject();
            });
        });

    }

    LoadTexture(asset) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.textureLoader.load(asset.path, (texture) => {
                var material = new SpriteMaterial({ map: texture });
                assetsProvidder.AddTexture(asset.name, material);
                resolve();
            }, () => { }, (error) => {
                console.error(error);
                reject();
            });
        });
    }

    LoadTPS(asset) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.objectLoader.load(asset.path + ".json", (obj) => {
                var json = obj;
                self.textureLoader.load(asset.path.slice(0, asset.path.lastIndexOf("/") + 1) + json.meta.image, (image) => {
                    var textureAtlas = new TextureAtlas(json, image);
                    Object.keys(textureAtlas.textures).forEach(key => {
                        var material = new SpriteMaterial({ map: textureAtlas.textures[key] });
                        assetsProvidder.AddTexture(key, material);
                    });
                    resolve();
                }, () => { }, (error) => {
                    console.error(error);
                    reject();
                });
            }, () => { }, (error) => {
                console.error(error);
                reject();
            });
        });
    }

    LoadAudio(asset) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.audioLoader.load(asset.path, (audio) => {
                assetsProvidder.AddSound(asset.name, audio);
                resolve();
            }, () => { }, (error) => {
                console.error(error);
                reject();
            });
        });


    }
}
export default AssetsLoader;