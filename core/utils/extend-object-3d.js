import { Object3D } from "three";

Object3D.prototype.Update = function (deltaTime) {
    var self = this;
}

Object3D.prototype.UpdateChildren = function (deltaTime) {
    var self = this;
    self.children.forEach(child => {
        child.Update && child.Update(deltaTime);
        child.UpdateChildren && child.UpdateChildren(deltaTime);
    });
}
Object3D.prototype.OnCollisionEnter = function (target) {
    
}
export default Object3D;