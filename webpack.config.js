var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: path.join(__dirname, 'src', 'tetris.js'),
	output: {
		filename: 'tetris.js',
		path: path.join(__dirname, 'dist'),
		publicPath: '',
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, 'src'),
				loader: 'eslint?{fix:true}'
			}
		],
		loaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, 'src'),
				loader: 'babel',
				query: {
					plugins: ['transform-runtime'],
					presets: ['es2015']
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false
			}
		}),
	]
}