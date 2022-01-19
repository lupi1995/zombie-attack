const path = require('path');
const AliasGenerator = require('./alias-generator');
var Alias = {}
var CusomCompile = {
    apply: (compiler) => {
        compiler.hooks.environment.tap("environment", () => {
            AliasGenerator.GenerateImporter();
        });
        compiler.hooks.beforeCompile.tap("beforeCompile", () => {
            AliasGenerator.GenerateAlias(Alias);
        });
    },
}
module.exports = {
    CusomCompile: CusomCompile,
    Alias: Alias
};