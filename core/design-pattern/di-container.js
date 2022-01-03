var modules = {};
var instances = {};
var params = {};

class DIContainer {
    static Register(name, definition, args) {
        modules[name] = definition;
        params[name] = args;
    }

    static Get(name) {
        return instances[name] || DIContainer.Create(name);
    }

    static Has(name) {
        return instances[name] != null || modules[name] != null;
    }

    static Create(name) {
        var module = modules[name];
        var instance = new module(params[name] || []);
        return instance;
    }
}
export default DIContainer;