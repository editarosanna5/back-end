var express = require('express');
var bodyParser = require('body-parser');

var howToUse = express.Router();

howToUse.use(bodyParser.json());

howToUse.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Welcome to the How to Use page');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST not allowed on /how-to-use');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT not allowed on /how-to-use');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE not allowed on /how-to-use');
});

module.exports = howToUse;