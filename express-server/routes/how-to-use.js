var express = require('express');
var bodyParser = require('body-parser');
var cors = require('./cors');

var howToUse = express.Router();

howToUse.use(bodyParser.json());

howToUse.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
    res.statusCode = 200;
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