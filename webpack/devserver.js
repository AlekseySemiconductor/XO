module.exports = function() {
	return {
		devServer: {
			hot: true,
			host: '192.168.0.102', // локальный ip-адрес моего компьютера, ipconfig в командной строке
			port: 5000,
			publicPath: '/',
			stats: 'errors-only'
		}
	}
}