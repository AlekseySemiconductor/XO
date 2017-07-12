const webpack = require('webpack');
module.exports = function() {
	return {
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					unused: true,
					dead_code: true,
					warnings: false
				},
				output: {
					comments: false
				}
			})
		]
	}
}