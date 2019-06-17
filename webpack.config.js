const HtmlWebpackPlugin = require('html-webpack-plugin');

const CONFIG = {
    mode: 'development',
    entry: {
        'app': './src/index.js',
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'three.js',
        template: './src/index.html'
    })]
};
