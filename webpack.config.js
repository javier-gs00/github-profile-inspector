const path = require('path')
const webpack = require('webpack')
require('dotenv').config()

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src')
}

// Some comments in the following configuration are taken from
// the Create React App webpack conf files since they explain
// things better than me :)
module.exports = env => {
    // console.log('NODE_ENV: ', env.NODE_ENV)
    // console.log('Production: ', env.production)
    // console.log(process.env)
    // console.log(env.NODE_ENV === 'development')

    return {
        entry: {
            app: path.join(paths.SRC, 'index.js')
        },
        output: {
            path: paths.DIST,
            filename: '[name].bundle.js',
            publicPath: '/'
        },
        devtool: env.NODE_ENV === 'production' ? false : 'eval-source-map',
        devServer: {
            // contentBase: './dist',
            publicPath: '/',
            host: "0.0.0.0",
            port: 3000
        },
        node: {
            fs: 'empty'
        },
        module: {
            rules: [
                {
                    // "oneOf" will traverse all following loaders until one will
                    // match the requirements. When no loader matches it will fall
                    // back to the "file" loader at the end of the loader list.
                    oneOf: [
                        // "url" loader works like "file" loader except that it embeds assets
                        // smaller than specified limit in bytes as data URLs to avoid requests.
                        // A missing `test` is equivalent to a match.
                        {
                            test: /\.(bmp|png|jpe?g|gif|svg)$/,
                            use: [
                                {
                                    loader: 'url-loader',
                                    options: {
                                        limit: 10000,
            
                                    }
                                }
                            ],
                        },
                        {
                            test: /\.(js|jsx)$/,
                            exclude: /node_modules/,
                            use: [
                                {
                                    loader: 'babel-loader',
                                    options: {
                                        // This is a feature of `babel-loader` for webpack (not Babel itself).
                                        // It enables caching results in ./node_modules/.cache/babel-loader/
                                        // directory for faster rebuilds.
                                        cacheDirectory: true
                                    }
                                }
                            ],
                        },
                        {
                            test: /\.less$/,
                            use: ExtractTextPlugin.extract({
                                fallback: 'style-loader',
                                use: ['css-loader', 'less-loader']
                            })
                        },
                        // "file" loader makes sure those assets get served by WebpackDevServer.
                        // When you `import` an asset, you get its (virtual) filename.
                        // In production, they would get copied to the `build` folder.
                        // This loader doesn't use a "test" so it will catch all modules
                        // that fall through the other loaders.
                        {
                            // Exclude `js` files to keep "css" loader working as it injects
                            // it's runtime that would otherwise processed through "file" loader.
                            // Also exclude `html` and `json` extensions so they get processed
                            // by webpacks internal loaders.
                            exclude: [/\.js$/, /\.html$/, /\.json$/],
                            test: /\.(png|jpg|gif)$/,
                            use: ['file-loader']
                        },
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(paths.SRC, 'index.html'),
                // uncomment next object for production
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                  }
            }),
            // CSS wil be extracted to this bundle file
            new ExtractTextPlugin('style.bundle.css'),
            new webpack.DefinePlugin({
                // Define environment variables
                'process.env': {
                    NODE_ENV: JSON.stringify(env.NODE_ENV),
                    REACT_APP_GITHUB_OAUTH_TOKEN: JSON.stringify(process.env.REACT_APP_GITHUB_OAUTH_TOKEN)
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                // sourceMap: true,
                output: {
                    comments: false
                }
            })
        ],
        // Enable importing JS files without specifying their extension
        resolve: {
            extensions: ['.js', '.jsx']
        }
    }
}