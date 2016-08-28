"use strict";

var path = require('path');
var autoprefixer = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');

var isDev = process.env.NODE_ENV !== 'production';
var commonCss = path.resolve(__dirname, './src/styles');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist/js'),
        publicPath: '/js/',
        filename: 'comments.js',
        libraryTarget: 'umd'
    },
    module: {
        preLoaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint-loader'}
        ],
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
            // regualr Sass loader
            {test: /\.s?css$/, exclude: /components/, loader: 'style!css!postcss!sass?sourceMap&includePaths[]='+commonCss},
            // CSS Modules loader
            {test: /\.s?css$/, include: /components/, loader: 'style!css?modules&localIdentName=[name]-[local]--[hash:base64:3]!postcss!sass?sourceMap&includePaths[]='+commonCss}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            '~': path.join(__dirname, './src/components'),
            'utils': path.join(__dirname, './src/utils.js'),
            'stores': path.join(__dirname, './src/stores'),
            'services': isDev ? path.join(__dirname, './src/services/mocks') : path.join(__dirname, './src/services')
        }
    },
    plugins: isDev ? [
        new CleanWebpackPlugin(['js'], {verbose: false, root: path.join(__dirname, './dist')})
    ] : [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': isDev ? '"development"' : '"production"'
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: { warnings: false }
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    eslint: {
        configFile: path.join(__dirname, './.eslintrc'),
        fix: true,
        cache: true
    },
    stats: { children: false, colors: true, reasons: false, chuncks: false, assets: false },
    postcss: [ require('autoprefixer')({ browsers: ['last 1 version'] }) ],
    cache: isDev,
    debug: isDev,
    devtool: isDev ? '#cheap-module-eval-source-map' : false
}