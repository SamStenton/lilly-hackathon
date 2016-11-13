module.exports = {
  query: function(sql, params, cb) {
  	var db = require('pg-query');
  	db.connectionParameters = process.env.DATABASE_URL;
    if (process.env.ENV!=="local") {db.defaults.ssl = true;}


  	var promise = db(sql, params);
  	function onSuccess(rows, result) {
  		cb(null, JSON.stringify(rows[0]), result)
  		done();
  	}
  	function onError(error) {
  		cb(error)
  	}
  	promise.spread(onSuccess, onError);
  }
};