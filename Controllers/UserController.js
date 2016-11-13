module.exports.controller = function(app) {
	var User = require('../Models/User')
	/**
	 * a home page route
	 */
	app.post('/user/create', function(req, res) {
		var newUser = new User(req.body)
		res.cookie('userCookie', newUser.id, { maxAge: (10000 * 365 * 24 * 60 * 60), httpOnly: true })
		res.send(newUser.id)
	});
	app.get('/user/all', function(req, res) {
		console.log(User.all())
	});
	app.get('/user/reset', function(req, res) {
		res.clearCookie('userCookie');
		res.redirect('/');
	});

}