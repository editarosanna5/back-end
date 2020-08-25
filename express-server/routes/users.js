var express = require('express');
var bodyParser = require('body-parser');
var User = require('./models/user');

var router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/login', (req, res, next) => {
  if (!req.session.user) {    // user not authenticated yet
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error('Enter your credentials.');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }

    var auth = new Buffer.from(authHeader.split('')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];

    User.findOne({username: username})
    .then((user) => {
      if (user === null) {
        var err = new Error('"' + username + '" has not been registered as a valid username.');
        err.status = 403;
        return next(err);
      } else if (user.password !== password) {
        var err = new Error('Incorrect password.');
        err.status = 403;
        return next(err);
      }
      else if (user.username === username && user.password === password) {
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Welcome "' + username + '" !');
      }
    })
    .catch((err) => next(err));
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already logged in.');
  }
});

router.get('logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
});

module.exports = router;