module.exports.controller = function(app) {
	var cookieParser = require('cookie-parser')

/**
 * a home page route
 */
  app.get('/', function(req, res) {
      res.render('index')
  });


}