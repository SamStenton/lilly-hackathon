module.exports.middleware = function(app) {
	var User = require('../Models/User')
	var shortid = require('shortid');
	//Cookie Middleware
	app.use(function (req, res, next) {
		var cookies = req.cookies

		if (cookies.userCookie === undefined) {
			res.redirect('/user/create');
		}

		User.findUserById(cookies.userCookie, function(err, user) {
			req.user = JSON.parse(user);
			next()
		});
	})

}