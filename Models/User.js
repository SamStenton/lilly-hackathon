	var shortid = require('shortid')
	var pg = require('pg');
	if (process.env.ENV!=="local") {pg.defaults.ssl = true;}

	function User(req) {
		pg.connect(process.env.DATABASE_URL, function(err, client) {
		  if (err) throw err;
		  client
		    .query('INSERT INTO users(name, age, email, cookieId) VALUES ($1, $2, $3, $4) RETURNING cookieId as id', [req.name, req.age, req.email, shortid.generate()], function(err, result) {
		    	this.id = result.rows[0].id
		    	client.end()
		    });
		});
	}

	User.id = function(id) {
		return this.id
	};
	User.get = function(id) {
		//Get from Database
		return {
			id: id,
			name: "Samuel Stenton"
		}
	};

	User.all = function() {
		var results = [];
		pg.connect(process.env.DATABASE_URL, function(err, client) {
		  if (err) throw err;
		  client
		    .query('SELECT * FROM users limit 1')
		    .on('row', function(row) {
		      return row;
		    });
		});
	};

module.exports = User;
