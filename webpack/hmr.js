const webpack = require('webpack');
module.exports = function() {
	return {
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin()
		]
	}
}