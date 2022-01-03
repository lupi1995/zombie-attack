Array.prototype.RemoveAt = function (index) {
    var self = this;
    self.splice(index, 1);
}

Array.prototype.Remove = function (element) {
    var self = this;
    var index = self.indexOf(element);
    if (index >= 0) {
        self.RemoveAt(index, 1);
    }
}

export default Array;