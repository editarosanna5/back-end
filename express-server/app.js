var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var fileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var homeRouter = require('./routes/home');
var howtouseRouter = require('./routes/how-to-use');

var mongoose = require('mongoose');

var Locations = require('./models/locations');
var Feedbacks = require('./models/feedbacks');

var url = config.mongoUrl;
var connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Proper connection to the server established");
}, (err) => {
  console.log(err);
});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('27071-23106-07123-16507'));

app.use(session({
  name: 'session-id',
  secret: '27071-23106-07123-16507',
  saveUninitialized: false,
  resave: false,
  store: new fileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth (req, res, next) {
  console.log(req.user);

  if (!req.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    return next(err);
  }
  else {
        next();
  }
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

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
