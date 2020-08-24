const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
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

const statSchema = new schema({
    date: {
        type: Date,
        required: true
    },
    visitor: {
        type: Number,
        required: true
    }
});

const locSchema = new schema({
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

const Locations = mongoose.model('Location', locSchema);
module.exports = Locations;