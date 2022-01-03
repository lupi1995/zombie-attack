import { Scene } from "three";

Scene.prototype.Update = function (deltaTime) {
    var self = this;
}

Scene.prototype.UpdateChildren = function (deltaTime) {
    var self = this;
    self.children.forEach(child => {
        child.Update && child.Update(deltaTime);
        child.UpdateChildren && child.UpdateChildren(deltaTime);
    });
}
export default Scene;