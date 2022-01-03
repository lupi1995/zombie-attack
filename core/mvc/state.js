class State {
    constructor(name, controller) {
        var self = this;
        self.name = name;
        self.controller = controller;
    }

    GetName() {
        var self = this;
        return self.name;
    }

    GetController() {
        var self = this;

        return self.controller;
    }

    OnEnter(data) {
        var self = this;
        self.controller.Start(data);
    }

    OnLeave(params) {
        var self = this;
        self.controller.Complete();
    }
}
export default State;