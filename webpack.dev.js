const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
require('dotenv').config()

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src')
}

// Some comments in the following configuration are taken from
// the Create React App webpack conf files since they explain
// things better than me :)
module.exports = env => merge(common(env), {
    devtool: env.NODE_ENV === 'production' ? false : 'eval-source-map',
    devServer: {
        // contentBase: './dist',
        publicPath: '/',
        host: "0.0.0.0",
        port: 3000,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(paths.SRC, 'index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    node: {
        fs: 'empty'
    },
    // Enable importing JS files without specifying their extension
    resolve: {
        extensions: ['.js', '.jsx']
    }
})