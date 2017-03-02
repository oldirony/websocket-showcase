module.exports = {
	entry: './src/app.js',
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
			}
		]
	}
};