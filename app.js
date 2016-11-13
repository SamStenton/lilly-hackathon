var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
var pgp = require('pg-promise')()
var pg = require('pg');
var env = require('dotenv').config()
if (process.env.ENV!=="local") {pg.defaults.ssl = true;}



// require('./config/migrations.js')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Migrations
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  client.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name VARCHAR(64) not null, email text, age integer, cookieId text);')
  .on('error', function(error) {
    console.log(error)
  });
  client.query('CREATE TABLE IF NOT EXISTS tiles(id SERIAL PRIMARY KEY, user_id text not null, data text, create_at timestamp);')
  .on('error', function(error) {
    console.log(error)
  });
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Include Middleware dynamically
fs.readdirSync('./Middleware').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./Middleware/' + file);
      route.middleware(app);
  }
});

//Include Controllers dynamically
fs.readdirSync('./Controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./Controllers/' + file);
      route.controller(app);
  }
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
