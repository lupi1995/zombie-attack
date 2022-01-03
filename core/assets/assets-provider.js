
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";

class AssetsProvidder {
    constructor() {
        var self = this;
        self.models = [];
        self.textures = [];
        self.sounds = [];
    }

    AddModel(name, model) {
        var self = this;
        self.models[name] = model;
    }

    AddTexture(name, texture) {
        var self = this;
        self.textures[name] = texture;
    }

    AddSound(name, sound) {
        var self = this;
        self.sounds[name] = sound;
    }

    GetModel(name) {
        var self = this;
        var model = SkeletonUtils.clone(self.models[name]);
        model.animations.push(...self.models[name].animations);
        return model;
    }

    GetTexture(name) {
        var self = this;
        return self.textures[name].clone();
    }

    GetSound(name) {
        var self = this;
        return self.sounds[name];
    }
}
export default new AssetsProvidder();