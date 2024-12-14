const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    timestamp: {type: Date, default: Date.now},
});




module.exports = mongoose.model('User', UserSchema);