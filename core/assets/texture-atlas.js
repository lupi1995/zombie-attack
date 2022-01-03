import _ from 'underscore';
import { Texture } from 'three';
class TextureAtlas {
    constructor(json, image) {
        this.textures = {};
        let texture = new Texture(image);
        texture.needsUpdate = true;

        let frames = json.frames;
        _.keys(frames).forEach(function (key, i) {
            let frame = frames[key];
            let t = texture.clone();
            let data = frame.frame;
            t.repeat.set(data.w / image.width, data.h / image.height);
            t.offset.x = ((data.x) / image.width);
            t.offset.y = 1 - (data.h / image.height) - (data.y / image.height);
            t.needsUpdate = true;

            this.textures[key.replace('.png', '').toLowerCase()] = t;
        }, this);
    }
}
export default TextureAtlas;