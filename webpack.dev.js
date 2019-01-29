const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const common = require("./webpack.common.js")

// Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin")

const paths = {
	DIST: path.resolve(__dirname, "dist"),
	SRC: path.resolve(__dirname, "src")
}

module.exports = env =>
	merge(common(env), {
		mode: "development",
		devtool: env.NODE_ENV === "production" ? false : "eval-source-map",
		devServer: {
			contentBase: "./dist",
			publicPath: "/",
			host: "0.0.0.0",
			port: 3000,
			historyApiFallback: true,
			hot: true,
			proxy: {
				"/api": {
					target: "http://localhost:3001/api",
					pathRewrite: { "^/api": "" }
				}
			}
		},
		module: {
			rules: [
				{
					test: /\.less$/,
					use: [
						{
							loader: "style-loader" // creates style nodes from JS strings
						},
						{
							loader: "css-loader" // translates CSS into CommonJS
						},
						{
							loader: "less-loader" // compiles Less to CSS
						}
					]
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				inject: true,
				template: path.join(paths.SRC, "index.html")
			}),
			new webpack.HotModuleReplacementPlugin()
		]
	})
