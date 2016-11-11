module.exports.controller = function(app) {
	var User = require('../Models/User')
	/**
	 * a home page route
	 */
	app.get('/', function(req, res) {
		res.render('index', {user: req.user})
	});


}