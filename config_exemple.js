var mysqlAdapter = require('sails-mysql');

module.exports = {
	"facebook" : {
		"appId" : "1552370238316590",
		"appSecret" : "ec3e7fed336ad9c44524abdf04c82f66",
		"redirectUri" : "http://localhost:5000/loginCallback"
	},
	"orm" : {
		// Setup Adapters
		// Creates named adapters that have have been required
		adapters: {
			'default': 'mysql',
			'mysql': mysqlAdapter
		},
		// Build Connections Config
		// Setup connections using the named adapter configs
		connections: {
			myLocalMySql: {
				adapter: 'mysql',
				host: '127.0.0.1',
				database: 'betterpage',
				host      : '127.0.0.1',
		    user      : 'root',
		    password  : '',
			}
		},
		defaults: {
			migrate: 'safe',
      autoCreatedAt: false,
      autoUpdatedAt: false
		}
	}
};