import eventManager from "./event-manager";

class EventListener {
    constructor() {
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

    RemoveAllEvents() {
        var self = this;
        eventManager.UnregisterAll(self);
    }
}

export default EventListener;