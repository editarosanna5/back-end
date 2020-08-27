var mongoose = require('mongoose');
var schema = mongoose.Schema;

var statSchema = new schema({
    date: {
        type: Date,
        required: true
    },
    visitor: {
        type: Number,
        required: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }
});

var Stats = mongoose.model('Stat', statSchema);

module.exports = Stats;