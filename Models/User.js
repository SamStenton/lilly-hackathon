	var shortid = require('shortid')
	var pg = require('pg');
	if (process.env.ENV!=="local") {pg.defaults.ssl = true;}

	function query(sql, params, cb) {
	  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
	    if (err) { 
	      done(); // release client back to pool
	      cb(err);
	      return;
	    }
	    client.query(sql, params, cb);
	  });
	}
	
	function User(userId, req) {
		var sql = `
		  INSERT
		  INTO users(name, age, email, cookieId)
		  VALUES($1, $2, $3, $4) RETURNING cookieId as id
		`;

		query(sql, [req.name, req.age, req.email, userId], function(err, result) {
		  if (err) return cb(err);
		  cb(null, JSON.stringify(result.rows[0]));
		});
	}

	// returns user object if found, else returns undefined
	User.findUserById = function(id, cb) {
	  var sql = `
	    SELECT *
	    FROM users
	    WHERE cookieid = $1
	  `;

	  query(sql, [id], function(err, result) {
	    if (err) return cb(err);
	    cb(null, JSON.stringify(result.rows[0]));
	  });
	};

module.exports = User;
