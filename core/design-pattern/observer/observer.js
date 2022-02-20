
class Observer {
    constructor() {
        var self = this;
        self.nodes = {};
        self.isNotifying = false;
        self.queueEvents = [];
    }

    Notify(event, source, data) {
        var self = this;

        if (self.isNotifying) {
            self.enqueue(event, source, data);
            return;
        }
        self.isNotifying = true;

        var listeners = self.nodes[event] || [];
        listeners.forEach(listener => {
            listener.source[listener.onEvent](data, source)
        });

        self.isNotifying = false;
        self.queueEvents.length > 0 && self.dequeue();
    }

    enqueue(event, source, data) {
        var self = this;
        self.queueEvents.push({
            event: event,
            source: source,
            data: data
        });
    }

    dequeue() {
        var self = this;
        var eventData = self.queueEvents.shift();
        self.Notify(eventData.event, eventData.source, eventData.data);
    }

    Register(event, source) {
        var self = this;
        var listeners = self.nodes[event];
        if (listeners == null) {
            listeners = [];
            self.nodes[event] = listeners;
        }

        if (listeners.includes(source)) {
            return;
        }
        listeners.push({ source: source, onEvent: "on" + event });
    }

    Unregister(event, source) {
        var self = this;

        var listeners = self.nodes[event] || [];
        listeners.forEach(listener => {
            if (listener.source == source) {
                listeners.Remove(listener);
            }
        });
    }

    UnregisterAll(source) {
        var self = this;
        Object.keys(self.nodes).forEach(key => {
            self.Unregister(key, source);
        });
    }
}

export default Observer;