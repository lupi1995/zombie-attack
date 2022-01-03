import eventManager from "./event-manager";
import { Object3D } from "three";
class ObjectEventListener extends Object3D {
    constructor() {
        super();
        var self = this;
        self.addEventListener("removed", self.onDestroy.bind(self));
    }

    notify(event, data) {
        var self = this;
        eventManager.Notify(event, self, data);
    }

    register(event) {
        var self = this;
        eventManager.Register(event, self);
    }

    unregister(event) {
        var self = this;
        eventManager.Unregister(event, self);
    }

    onDestroy() {
        var self = this;
        eventManager.UnregisterAll(self);
    }
}

export default ObjectEventListener;