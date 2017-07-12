module.exports = function() {
	return {
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: ['react']
					}
				}
			]
		}
	}
}