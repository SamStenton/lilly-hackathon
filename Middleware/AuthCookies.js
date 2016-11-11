module.exports.middleware = function(app) {
	var User = require('../Models/User')
	var shortid = require('shortid');
	//Cookie Middleware
	app.use(function (req, res, next) {
		if ( req.path == '/user/create') return next();

		User.authenticate(req, function(result) {
			if (result === undefined) {
				res.redirect('/user/create')
			}
			req.user = JSON.parse(result);
			next()
		});
	})

}