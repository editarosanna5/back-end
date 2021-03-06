var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('./cors');

var Feedbacks = require('../models/feedbacks');
var Locations = require('../models/locations');

var about = express.Router();

about.use(bodyParser.json());

about.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
    res.statusCode = 200;
    res.end('This is the About page');
})
.post(cors.corsWithOptions, (req, res, next) => {
    Feedbacks.create(req.body)
    .then((feedback) => {
        console.log('Thank you for your feedback!');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    }, (err) => next(err))
    .catch((err) => next(err));
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