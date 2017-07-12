const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function() {
	return {
		module: {
			rules: [
				{
					test: /\.less$/,
					use: ExtractTextPlugin.extract({
						publicPath: '../',
						fallback: 'style-loader',
						use: ['css-loader', 'less-loader']
					})
				}
			]
		},
		plugins: [
			new ExtractTextPlugin('[name].css'),
			new OptimizeCssAssetsPlugin({
				assetNameRegExp: /\.css$/g,
				cssProcessor: require('cssnano'),
				cssProcessorOptions: { discardComments: {removeAll: true } },
				canPrint: true
			})
		]
	}
}