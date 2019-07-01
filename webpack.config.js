const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const THREE = require('three')

const CONFIG = {
    mode: 'development',
    entry: {
        'app': './src/index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            THREE: 'three'
        }),
        new CopyWebpackPlugin([{
            from: __dirname + "/src/assets",
            to: __dirname + "/dist/assets",
        }])
    ]
};

module.exports = CONFIG;
