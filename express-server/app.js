var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var homeRouter = require('./routes/home');
var howtouseRouter = require('./routes/how-to-use');

var mongoose = require('mongoose');

var Locations = require('./models/locations'); var Feedbacks = require('./models/feedbacks');

var mongoUrl = 'mongodb://localhost:27017/express-server';
var connect = mongoose.connect(mongoUrl);

connect.then((db) => {
  console.log('Connected correctly to the server');
}, (err) => { console.log(err); });

var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(27071-23106-07123-16507));

function auth (req, res, next) {
  console.log(req.signedCookies);

  if (!req.signedCookies.user) {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
        var err = new Error('You are not authenticated!');
    
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        return next(err);
    }
    
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    
    var username = auth[0];
    var password = auth[1];

    if (username === 'admin' && password === 'password') {
        res.cookie('user','admin',{signed: true});
        next(); // authorized
    }
    else {
        var err = new Error('You are not authenticated!');
    
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        next(err);
    }
  }
  else {
      if (req.signedCookies.user === 'admin') {
          next();
      }
      else {
          var err = new Error('You are not authenticated!');
          
          err.status = 401;
          return next(err);
      }
  }
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/home', homeRouter);
app.use('/how-to-use', howtouseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
