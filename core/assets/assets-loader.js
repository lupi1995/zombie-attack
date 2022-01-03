import AssetsConfig from "./assets-config";
import AssetsType from "./assets-type";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import assetsProvidder from "./assets-provider";
import { ObjectLoader, TextureLoader, SpriteMaterial } from "three";
import TextureAtlas from "./texture-atlas";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/dracoloader";
import A from "../../node_modules/three"
class AssetsLoader {
    constructor() {
        var self = this;
        self.totalFile = 0;
        var dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('../../node_modules/three/examples/js/libs/draco/gltf/');
        self.modelLoader = new GLTFLoader();
        self.modelLoader.setDRACOLoader(dracoLoader)
        self.objectLoader = new ObjectLoader();
        self.textureLoader = new TextureLoader();
        self.OnLoadComplete = () => { };
    }

    LoadAssets(sceneName, onLoadComplete) {
        var self = this;
        if (!AssetsConfig[sceneName]) {
            onLoadComplete();
            return;
        }
        self.OnLoadComplete = onLoadComplete;
        self.totalFile = AssetsConfig[sceneName].length;
        AssetsConfig[sceneName].forEach(asset => {
            switch (asset.type) {
                case AssetsType.Model:
                    self.LoadModel(asset);
                    break;
                case AssetsType.Texture:
                    self.LoadTexture(asset);
                    break;
                case AssetsType.Sound:

                    break;
                case AssetsType.TPS:
                    self.LoadTPS(asset);
                    break;
                default:
                    break;
            }
        });
    }

    LoadModel(asset) {
        var self = this;
        self.modelLoader.load(asset.path, function (gltf) {
            gltf.scene.traverse(child => {
                child.material && (child.material.metalness = 0);
            });

            if (gltf.animations.length > 0) {
                gltf.scene.animations.push(...gltf.animations);
            }

            assetsProvidder.AddModel(asset.name, gltf.scene);
            if (--self.totalFile == 0) {
                self.OnLoadComplete();
            }
        }, undefined, (error) => {
            if (--self.totalFile == 0) {
                self.OnLoadComplete();
            }
            console.error(error);
        });
    }

    LoadTexture(asset) {
        var self = this;
        self.textureLoader.load(asset.path, (texture) => {
            var material = new SpriteMaterial({ map: texture });
            assetsProvidder.AddTexture(asset.name, material);
            if (--self.totalFile == 0) {
                self.OnLoadComplete();
            }
        }, () => { }, (error) => {
            console.error(error);
            if (--self.totalFile == 0) {
                self.OnLoadComplete();
            }
        });

    }

    LoadTPS(asset) {
        var self = this;
        self.objectLoader.load(asset.path + ".json", (obj) => {
            var json = obj;
            self.textureLoader.load(asset.path.slice(0, asset.path.lastIndexOf("/") + 1) + json.meta.image, (image) => {
                var textureAtlas = new TextureAtlas(json, image);
                Object.keys(textureAtlas.textures).forEach(key => {
                    var material = new SpriteMaterial({ map: textureAtlas.textures[key] });
                    assetsProvidder.AddTexture(key, material);
                });
                if (--self.totalFile == 0) {
                    self.OnLoadComplete();
                }
            }, () => { }, (error) => {
                console.error(error);
                if (--self.totalFile == 0) {
                    self.OnLoadComplete();
                }
            });
        }, () => { }, (error) => {
            console.error(error);
            if (--self.totalFile == 0) {
                self.OnLoadComplete();
            }
        });
    }
}
export default AssetsLoader;