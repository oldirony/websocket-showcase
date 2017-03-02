const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
		'./src/app.js',
		'./src/styles/style.scss'
	],
	output: {
		filename: './dist/bundle.js'
	},
	module : {
		rules : [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					presets: ["es2015", "react"]
				}
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: ["css-loader", "sass-loader"]
				})
			}
		]
	},
	plugins : [
		new ExtractTextPlugin('./dist/style.css')
	],
	devServer: {
		historyApiFallback: true,
		contentBase: './'
	}
};