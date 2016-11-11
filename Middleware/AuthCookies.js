module.exports.middleware = function(app) {
	var User = require('../Models/User')
	var shortid = require('shortid');
	//Cookie Middleware
	app.use(function (req, res, next) {
		var cookies = req.cookies

		if (cookies.userCookie === undefined) {
			var user = new User()
			res.cookie('userCookie', user.id, { maxAge: (10000 * 365 * 24 * 60 * 60), httpOnly: true })
		}
		//Set user details
		user == undefined ? req.user = User.get(cookies.userCookie) : req.user = user
	  	next()
	})

}