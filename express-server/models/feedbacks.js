var mongoose = require('mongoose');
var schema = mongoose.Schema;

var feedbackSchema = new schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    telnum: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    agree: {
        type: Boolean,
        default: false
    },
    contactType: {
        type: String,
        default: 'Tel.'
    },
    message: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

var Feedbacks = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedbacks;