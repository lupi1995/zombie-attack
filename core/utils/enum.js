
class Enum {
    constructor(extendClass, events) {
        events.forEach(event => {
            extendClass[event] = event;
        });
        Object.freeze(extendClass);
    }
}

export default Enum;