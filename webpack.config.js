const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const path = require('path');


module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test:/\.(s*)css$/,
                use: [
                    miniCss.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
   },

    plugins: [
        new miniCss({
            filename: 'style.css',
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Test page',
            header: 'Тестовая страница',
            metaDesc: 'Test page Description',
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],
    mode: 'development',
    output: {
        filename: 'bundle.js',
    },
    devServer: {
        watchFiles: ['src/**/*'],
        open: true,
        port: 8080
    }
};