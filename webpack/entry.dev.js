const webpack = require('webpack');
module.exports = function() {
	return {
		entry: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://192.168.0.102:5000/',
			'webpack/hot/only-dev-server',
			'./index.js'
		]
	}
}