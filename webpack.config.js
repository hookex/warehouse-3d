const HtmlWebpackPlugin = require('html-webpack-plugin');

const CONFIG = {
    mode: 'development',
    entry: {
        'app': './src/index.js',
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })]
};

module.exports = CONFIG;
