var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

var Users = mongoose.model('User', userSchema);
module.exports = Users;