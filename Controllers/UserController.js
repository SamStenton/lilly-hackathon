module.exports.controller = function(app) {
	var User = require('../Models/User')
	var RememberTile = require('../Models/RememberTile')

	app.get('/user/create', function(req, res) {
		res.render('user/create');
	});
	
	app.post('/user/create', function(req, res) {
		var shortid = require('shortid')
		new User(shortid.generate(), req.body, function(err, user) {
			res.cookie('userCookie', JSON.parse(user).cookieid, { maxAge: (10000 * 365 * 24 * 60 * 60), httpOnly: true })
			res.redirect('/tests');
		})
	});

	app.get('/user/account', function(req, res) {
		RememberTile.getResults(req.user.id, function(error, firstRow, results) {
			var tilesResults = results.rows.map(function(element) {
				element.created_at = new Date(element.created_at).toISOString().replace(/T/, ' ').replace(/\..+/, '')
				element.data = JSON.parse(element.data)
				return JSON.parse(JSON.stringify(element))	
			});	
			res.render('user/account', {user: req.user, tiles: tilesResults});
		});


	});

	app.get('/user/reset', function(req, res) {
		res.clearCookie('userCookie');
		res.redirect('/');
	});

}