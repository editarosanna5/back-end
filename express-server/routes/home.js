var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');

var Locations = require('../models/locations');

var home = express.Router();

home.use(bodyParser.json());

home.route('/')
.get((req, res, next) => {
    Locations.find({})
    .then((locations) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(locations); 
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    Locations.create(req.body)
    .then((location) => {
        console.log('"', location, '" registered!');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT not allowed on /home');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Locations.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

home.route('/:locationId')
.get((req, res, next) => {
    Locations.findById(req.params.locationId)
    .then((location) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {    
    res.statusCode = 403;
    res.end('POST not allowed on /home/' + req.params.locationId);
})
.put(authenticate.verifyUser, (req, res, next) => {
    Locations.findByIdAndUpdate(req.params.locationId, {
        $set: req.body
    }, { new: true })
    .then((location) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Locations.findByIdAndRemove(req.params.locationId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

home.route('/:locationId/comments')
.get((req, res, next) => {
    Locations.findById(req.params.locationId)
    .then((location) => {
        if (location != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(location.comments);
        } else {
            err = new Error('"' + req.params.locationId + '" is not a registered location');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Locations.findById(req.params.locationId)
    .then((location) => {
        if (location != null) {
            location.comments.push(req.body);
            location.save()
            .then((location) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(location);
            }, (err) => next(err));
        } else {
            err = new Error('"' + req.params.locationId + '" is not a registered location');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT not allowed on /home/' + req.params.locationId + '/comments');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Locations.findById(req.params.locationId)
    .then((location) => {
        if (location != null) {
            for (var i = (location.comments.length -1); i >= 0; i--) {
                location.comments.id(location.comments[i]._id).remove();
            }
            location.save()
            .then((location) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(location);                
            }, (err) => next(err));
        } else {
            err = new Error('"' + req.params.locationId + '" is not a registered location');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});

home.route('/:locationId/comments/:commentId')
.get((req, res, next) => {
    Locations.findById(req.params.locationId)
    .then((location) => {
        if (location != null && location.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(location.comments.id(req.params.commentId));
        }
        else if (location == null) {
            err = new Error('"' + req.params.locationId + '" is not a registered location');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST not allowed on /home/'+ req.params.locationId
        + '/comments/' + req.params.commentId);
})
.put((req, res, next) => {
    Locations.findById(req.params.locationId)
    .then((location) => {
        if (location != null && location.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                location.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                location.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            location.save()
            .then((location) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(location);                
            }, (err) => next(err));
        }
        else if (location == null) {
            err = new Error('"' + req.params.locationId + '" is not a registered location');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Locations.findById(req.params.locationId)
    .then((location) => {
        if (location != null && location.comments.id(req.params.commentId) != null) {
            location.comments.id(req.params.commentId).remove();
            location.save()
            .then((location) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(location);                
            }, (err) => next(err));
        }
        else if (location == null) {
            err = new Error('"' + req.params.locationId + '" is not a registered location');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = home;