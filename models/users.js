const mongoose = require('mongoose');
require('./connection');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;