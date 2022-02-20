import EventListener from "../design-pattern/observer/event-listener";

class ScaleManager {
    constructor(app) {
        var self = this;
        self.app = app;
        global.addEventListener("resize", self.onResize.bind(self));
    }

    onResize() {
        var self = this;
        var scaleInfo = {
            width: global.innerWidth,
            height: global.innerHeight
        }
        self.app.OnResize(scaleInfo);
    }
}
export default ScaleManager;