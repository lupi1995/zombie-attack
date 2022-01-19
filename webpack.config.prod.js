const USING_EMBEDDED_ASSETS = false;

var config = USING_EMBEDDED_ASSETS ? require("./webpack-settings/webpack-embed-config-prod") : require("./webpack-settings/webpack-config-prod");
module.exports = config;