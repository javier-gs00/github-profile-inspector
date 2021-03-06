const path = require('path')
const webpack = require('webpack')
require('dotenv').config()

// Plugins
// const ExtractTextPlugin = require("extract-text-webpack-plugin")

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src')
}

// Some comments in the following configuration are taken from
// the Create React App webpack conf files since they explain
// things better than me :)
module.exports = env => ({
  entry: {
    app: path.join(paths.SRC, 'index.js')
  },
  output: {
    path: paths.DIST,
    filename: '[name].bundle.js',
    publicPath: '/'
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
                  limit: 10000
                }
              }
            ]
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
                  cacheDirectory: true,
                  presets: ['@babel/preset-env']
                }
              }
            ]
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
            // by webpack internal loaders.
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            test: /\.(png|jpg|gif)$/,
            use: ['file-loader']
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env.NODE_ENV),
        // dotenv vars are accessed with process.env
        REACT_APP_GITHUB_OAUTH_TOKEN: JSON.stringify(process.env.REACT_APP_GITHUB_OAUTH_TOKEN)
      }
    })
  ],
  node: {
    fs: 'empty'
  },
  // Enable importing JS files without specifying their extension
  resolve: {
    extensions: ['.js', '.jsx']
  }
})
