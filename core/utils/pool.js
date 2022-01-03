
class Pool {
    constructor(T, size) {
        var self = this;
        self.availabels = [];
        self.usings = [];

        for (let index = 0; index < size; index++) {
            self.availabels.push(new T);
        }
    }

    Pop() {
        var self = this;
        var obj = self.availabels.shift();
        if (obj) {
            obj.visible = true;
            self.usings.push(obj);
        }
        return obj;
    }

    Push(obj) {
        var self = this;
        if (self.usings.includes(obj)) {
            self.usings.Remove(obj);
            self.availabels.push(obj);
            obj.visible = false;
            obj.Reset && obj.Reset();
        }
    }
}
export default Pool;