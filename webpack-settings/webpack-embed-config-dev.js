const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const HTMLWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { CusomCompile, Alias } = require('./custom-compile');

var DevEmbedConfig = {
    mode: 'development',
    entry: ['./src/index.js', './plugins/ammo.wasm.js','./plugins/three.min.js'],
    output: {
        path: path.resolve("dist"),
    },
    node: {
        fs: 'empty'
    },
    devServer: {
        contentBase: 'dist',
        port: 3000,
        https: true
    },
    devtool: 'inline-source-map',
    plugins: [
        new HTMLWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inlineSource: '.(js|css)$',
        }),
        new HTMLWebpackInlineSourcePlugin(),
        new FileManagerPlugin({
            events: {
                onStart: {},
                onEnd: {
                    delete: ["dist/main.js", "dist/assets"]
                },
            },
            runTasksInSeries: false,
            runOnceInWatchMode: false,
        }),
        CusomCompile
    ],
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: Alias,
    },
    
}

module.exports = DevEmbedConfig;