module.exports = {
  query: function(sql, params, cb) {
  	var db = require('pg-query');
  	db.connectionParameters = process.env.DATABASE_URL;

  	var promise = db(sql, params);
  	function onSuccess(rows, result) {
  		cb(null, JSON.stringify(result))
  		done();
  	}
  	function onError(error) {
  		cb(error)
  	}
  	promise.spread(onSuccess, onError);
  }
};