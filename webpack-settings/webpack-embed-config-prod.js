const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const path = require('path');
const { CusomCompile, Alias } = require('./custom-compile');

var ProductionConfig = {
    mode: 'production',
    entry: ['./src/index.js', './plugins/ammo.wasm.js','./plugins/three.min.js'],
    module: {
        rules: [{
            test: /.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        ["@babel/transform-runtime"]
                    ]
                }
            }
        }]
    },
    node: {
        fs: 'empty'
    },
    devServer: {
        contentBase: 'build',
        port: 3000,
        https: true
    },
    output: {
        path: path.resolve("build"),
    },
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
                    delete: ["build/main.js", "build/assets"]
                },
            },
            runTasksInSeries: false,
            runOnceInWatchMode: false,
        }),
        CusomCompile
    ],
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: Alias
    },
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: Alias
    },
}

module.exports = ProductionConfig;