var mongoose = require('mongoose');
var schema = mongoose.Schema;

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
    }
}, {
    timestamps: true
});

var Locations = mongoose.model('Location', locationSchema);
module.exports = Locations;