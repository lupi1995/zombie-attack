Object.Clone = function (object) {
    var result = {};
    if (typeof object != "object") return object;
    if (!Array.isArray(object)) {
        if (!!object.__proto__) result.__proto__ = Object.create(object.__proto__);
        if (!!object.constructor) result.constructor = object.constructor;
    } else {
        result = [];
    }

    var keys = Object.keys(object);
    keys.forEach(key => {
        var type = typeof object[key];
        var value = object[key];
        var isNotNode = (!!value && !!value.constructor && value.constructor.name != "cc_Node");
        if (type == "object" && isNotNode) {
            result[key] = Object.Clone(value);
        }
        else
            result[key] = value;
    });
    return result;
}