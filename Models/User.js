	var shortid = require('shortid')
	var db = require('../config/db');

	if (process.env.ENV!=="local") {pg.defaults.ssl = true;}
	
	function User(userId, req, cb) {
		var sql = `
		  INSERT
		  INTO users(name, age, email, cookieId)
		  VALUES($1, $2, $3, $4) RETURNING *
		`;

		db.query(sql, [req.name, req.age, req.email, userId], cb);
	}

	// returns user object if found, else returns undefined
	User.findUserById = function(id, cb) {
	  var sql = `
	    SELECT *
	    FROM users
	    WHERE cookieid = $1
	    LIMIT 1
	  `;
	  db.query(sql, [id], cb);
	};

module.exports = User;
