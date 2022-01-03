import EventListener from "../design-pattern/observer/event-listener";
import Model from "./model";
import View from "./view";


class Controller extends EventListener {
    constructor(view, model) {
        var self = this;
        self.view = view || new View();
        self.model = model || new Model();
    }

    Start(data) {
        var self = this;
        self.view.Show();
    }

    Complete() {
        var self = this;
        self.view.Hide();
    }

    GetModel() {
        var self = this;
        return self.model;
    }

    GetView() {
        var self = this;
        return self.view;
    }
}
export default Controller;