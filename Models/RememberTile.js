// var pg = require('pg');
var db = require('../config/db');
if (process.env.ENV!=="local") {pg.defaults.ssl = true;}

function RememberTile() {}

RememberTile.log = function(user, data, cb) {
  var sql = `
    INSERT
    INTO tiles(user_id, data, created_at)
   	VALUES($1, $2, CURRENT_TIMESTAMP)
   	RETURNING *
  `;

  db.query(sql, [user.id, JSON.stringify(data)], cb);
};

RememberTile.getResults = function(user_id, cb) {
  var sql = `
    SELECT * FROM tiles
	WHERE user_id = $1
	ORDER BY created_at desc
  `;

  db.query(sql, [user_id], cb);
};

module.exports = RememberTile;