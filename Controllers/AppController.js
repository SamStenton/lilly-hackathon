module.exports.controller = function(app) {
	var User = require('../Models/User')
	/**
	 * a home page route
	 */
	app.get('/', function(req, res) {
		res.redirect('/tests')
	});

	app.get('/tests', function(req, res) {
		res.render('tests/index', {user: req.user});
	});



}