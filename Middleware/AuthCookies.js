module.exports.middleware = function(app) {
	var shortid = require('shortid');
	//Cookie Middleware
	app.use(function (req, res, next) {
		var cookies = req.cookies

		if (cookies.userCookie === undefined) {
			res.cookie('userCookie',shortid.generate(), { maxAge: (10000 * 365 * 24 * 60 * 60), httpOnly: true })
		}
		//Get User Deets
	  	next()
	})

}