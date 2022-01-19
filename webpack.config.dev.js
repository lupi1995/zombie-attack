
const USING_EMBEDDED_ASSETS = false;

var config = USING_EMBEDDED_ASSETS ? require("./webpack-settings/webpack-embed-config-dev") : require("./webpack-settings/webpack-config-dev");
module.exports = config;