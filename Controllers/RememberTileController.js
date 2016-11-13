module.exports.controller = function(app) {
	// var User = require('../Models/User')
	/**
	 * a home page route
	 */
	app.get('/remember-tile/level/:level', function(req, res) {
		// 4x4 = 16
		var level = [4,4,4,5,5,6,6,6,8,9,10]
		var tiles = level[req.params.level];
		var arr = Array.from(Array(15).keys());
		arr = arr.map(function(el, index) {
			return el + 1;
		});

		arr.sort(function() { return 0.5 - Math.random() });
		return res.send(arr.slice(0,tiles))
	});

}