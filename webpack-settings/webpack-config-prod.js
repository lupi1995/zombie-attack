const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
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
        filename: 'main.js',
        path: path.resolve("build"),
    },
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
    },
}

module.exports = ProductionConfig;