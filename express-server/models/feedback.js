const mongoose = require('mongoose');
const schema = mongoose.Schema;

const feedbackSchema = new mongoose.Schema({
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