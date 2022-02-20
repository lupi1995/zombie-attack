class FPSController {
    constructor(app) {
        var self = this;
        self.frameCount = 0;
        self.then = performance.now();
        self.elapsed = 0;
        self.fps = 60;
        self.fpsInterval = 1000 / self.fps;
        self.startTime = self.then;
        self.app = app;
    }

    Start() {
        var self = this;
        global.addEventListener("focus", self.resetTime.bind(self));
        global.addEventListener("blur", self.onLostFocus.bind(self));
        self.resetTime();
        self.update();
    }

    resetTime() {
        var self = this;
        self.startTime = performance.now();
        self.then = performance.now();
        self.frameCount = 0;
        self.isLostFocus = false;
    }

    onLostFocus() {
        var self = this;
        self.isLostFocus = true;
    }

    update() {
        var self = this;
        requestAnimationFrame(self.update.bind(self));
        if (self.isLostFocus || self.app.IsPaused()) return;
        var now = performance.now();
        self.elapsed = now - self.then;
        var sinceStart = now - self.startTime;
        var deltaTime = Math.round(sinceStart / ++self.frameCount) / 1000;
        self.app.Update(deltaTime);
        if (self.elapsed > self.fpsInterval) {
            self.then = now - (self.elapsed % self.fpsInterval);
            if (self.app.AllowRendering()) {
                self.app.Render();
            }
        }
    }
}
export default FPSController;