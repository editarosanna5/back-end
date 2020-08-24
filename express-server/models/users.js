const mongoose = require('mongoose');
const schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const { model } = require('./locations');

const userSchema = new schema({
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

user.plugin(passportLocalMongoose);

const Users = mongoose.model('User', userSchema);
module.exports = Users;