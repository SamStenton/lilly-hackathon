var pg = require('pg');
if (process.env.ENV!=="local") {pg.defaults.ssl = true;}

function RememberTile() {}

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

RememberTile.log = function(user, data, cb) {
  var sql = `
    INSERT
    INTO tiles(user_id, data, created_at)
   	VALUES($1, $2, CURRENT_TIMESTAMP)
   	RETURNING *
  `;

  query(sql, [user.id, JSON.stringify(data)], function(err, result) {
    if (err) return cb(err);
    cb(null, result.rows[0]);
  });
};

module.exports = RememberTile;