const { resolve } = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entryProd = require('./webpack/entry.prod');
const entryDev = require('./webpack/entry.dev');

const devserver = require('./webpack/devserver');
const extractCSS = require('./webpack/css.extract');

const jsx = require('./webpack/jsx');
const less = require('./webpack/less');
const uglifyJS = require('./webpack/js.uglify');
const hmr = require('./webpack/hmr');


const common = merge([
	{
		context: resolve(__dirname, 'src'),
		output: {
			filename: 'bundle.js',
			path: resolve(__dirname, 'build'),
			publicPath: './'
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './index.ejs'
			})
		]
	},
	jsx()
]);

module.exports = function(env) {
	if (env === 'production') {
		return merge([
			common,
			entryProd(),
			uglifyJS(),
			extractCSS()
		]);
	} else if (env === 'development') {
		return merge([
			common,
			entryDev(),
			devserver(),
			hmr(),
			less()
		]);
	}
}