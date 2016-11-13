module.exports.middleware = function(app) {
	var User = require('../Models/User')
	var shortid = require('shortid');
	//Cookie Middleware
	app.use(function (req, res, next) {
		var cookies = req.cookies

		if (cookies.userCookie === undefined && req.url !== '/user/create') {
			res.redirect('/user/create');
		}

		User.findUserById(cookies.userCookie, function(err, user) {
			if (err) {console.log(err)}
			req.user = JSON.parse(user);
			next()
		});
	})

}