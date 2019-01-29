const path = require("path")
const merge = require("webpack-merge")
const common = require("./webpack.common.js")

// Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

const paths = {
	DIST: path.resolve(__dirname, "dist"),
	SRC: path.resolve(__dirname, "src")
}

module.exports = env =>
	merge(common(env), {
		mode: "production",
		devtool: env.NODE_ENV === "production" ? "source-map" : "eval-source-map",
		module: {
			rules: [
				{
					test: /\.(less|css)$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {}
						},
						"css-loader",
						"less-loader"
					]
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(["dist"]),
			new HtmlWebpackPlugin({
				inject: true,
				template: path.join(paths.SRC, "index.html"),
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
					minifyURLs: true
				}
			}),
			// CSS wil be extracted to this bundle file
			new MiniCssExtractPlugin({
				filename: "style.bundle.css"
			})
		],
		optimization: {
			minimize: true,
			splitChunks: {
				chunks: "async",
				minSize: 30000,
				minChunks: 1,
				maxAsyncRequests: 5,
				maxInitialRequests: 3,
				automaticNameDelimiter: "~",
				name: true,
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						priority: -10
					},
					default: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true
					}
				}
			},
			runtimeChunk: false,
			noEmitOnErrors: true,
			namedModules: true,
			namedChunks: true,
			nodeEnv: "production",
			removeAvailableModules: false,
			removeEmptyChunks: false,
			mergeDuplicateChunks: false,
			flagIncludedChunks: true
		}
	})
