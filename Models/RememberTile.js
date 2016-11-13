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

module.exports = RememberTile;