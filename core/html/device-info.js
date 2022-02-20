class DeviceInfo {

    static IsAndroid() {
        return navigator.userAgent.match(/Android/i);
    }

    static IsIOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }

    static IsMobile() {
        var self = this;
        return !!(self.IsAndroid() || self.IsIOS());
    }
}

export default DeviceInfo;