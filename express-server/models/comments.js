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
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }
}, {
    timestamps: true
});

var Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;