const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WatchmanPlugin = require('webpack-watchman-plugin');
const path = require('path');
const { CusomCompile, Alias } = require('./custom-compile');
const webpack = require("webpack");


var DevConfig = {
    mode: 'development',
    entry: ['./src/index.js', './plugins/ammo.wasm.js','./plugins/three.min.js'],
    node: {
        fs: 'empty'
    },
    output: {
        filename: 'main.js',
        path: path.resolve("dist")
    },
    devServer: {
        contentBase: 'dist',
        port: 3000,
        https: true,
        hot: true
    },
    devtool: 'inline-source-map',
    plugins: [
        new CopyWebpackPlugin([{
            from: 'assets',
            to: 'assets'
        }]),
        new HTMLWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            hash: true
        }),
        CusomCompile
    ],
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: Alias
    }
}

module.exports = DevConfig;