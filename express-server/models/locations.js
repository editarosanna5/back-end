var mongoose = require('mongoose');
var schema = mongoose.Schema;

var commentSchema = new schema({
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

var statSchema = new schema({
    date: {
        type: Date,
        required: true
    },
    visitor: {
        type: Number,
        required: true
    }
});

var locationSchema = new schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    capacity: {
        type: Number,
        required: true
    },
    visitorIn: {
        type: Number,
        required: true
    },
    visitorOut: {
        type: Number,
        required: true
    },
    comments: [commentSchema],
    stats: [statSchema]
}, {
    timestamps: true
});

var Locations = mongoose.model('Location', locationSchema);
module.exports = Locations;