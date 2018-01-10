const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
	entry: path.join(path.resolve(__dirname, "src/js"), "demo.js"),
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "app.bundle.js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(path.resolve(__dirname, "src"), "index.html")
		}),
		new ExtractTextPlugin("style.bundle.css"),
		new CopyWebpackPlugin([{ from: "src/img", to: "img" }]),
		new CopyWebpackPlugin([{ from: "src/favicon.ico", to: "" }])
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader"
					}
				]
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					use: "css-loader"
				})
			},
			{
				test: /\.(png|jpg|gif|svg|eot|woff|ttf|woff2)$/,
				use: ["file-loader"]
			}
		]
	},
	resolve: {
		modules: [path.resolve("./"), path.resolve("./node_modules"), path.resolve("./src/")],
		extensions: [".js", ".jsx"]
	}
};
