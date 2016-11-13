module.exports.controller = function(app) {
	var shortid = require('shortid')
	var User = require('../Models/User')

	app.get('/user/create', function(req, res) {
		if (req.cookies.userCookie !== undefined) {
			res.redirect('/');
		}

		res.cookie('userCookie', shortid.generate(), { maxAge: (10000 * 365 * 24 * 60 * 60), httpOnly: true })
		res.render('user/create');
	});
	
	app.post('/user/create', function(req, res) {
		new User(req.cookies.userCookie, req.body, function(err, user) {
			res.redirect('/');
		})
	});

	app.get('/user/account', function(req, res) {
		res.render('user/account', {user: req.user});
	});
	app.get('/user/reset', function(req, res) {
		res.clearCookie('userCookie');
		res.redirect('/');
	});

}