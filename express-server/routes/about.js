const express = require('express');
const bodyParser = require('body-parser');

const about = express.Router();

about.use(bodyParser.json());

about.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Welcome to the About page');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST not allowed on /about');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT not allowed on /about');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE not allowed on /about');
});

module.exports = about;