const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { ModuleFederationPlugin } = webpack.container;

module.exports = {
    entry: './src/index.tsx',
    mode: process.env.NODE_ENV || 'development',
    devServer: {
        port: 3001,
    },
    output: {
        publicPath: '/remoteApp/',
        path: path.resolve(__dirname, 'dist'),
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'remoteApp',
            filename: 'remoteEntry.js',
            remotes: {
                host: 'host@/remoteEntry.js',
            },
            exposes: {
                './App': './src/App'
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        })
    ]
};