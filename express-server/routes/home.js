const express = require('express');
const bodyParser = require('body-parser');

const home = express.Router();

home.use(bodyParser.json());

home.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Welcome to the Home page');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('"' + req.body.name + '" registered!');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT not allowed on /home');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('All registered locations deleted!');
});

home.route('/:locId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('"' + req.params.locId + '" information retrieved!');
})
.post((req, res, next) => {    
    res.statusCode = 403;
    res.end('POST not allowed on /home/' + req.params.locId);
})
.put((req, res, next) => {
    res.end('"' + req.params.locId + '" updated!');
})
.delete((req, res, next) => {
    res.end('"' + req.params.locId + '" deleted!');
});

module.exports = home;