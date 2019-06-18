const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
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
        })
    ]
};

module.exports = CONFIG;
