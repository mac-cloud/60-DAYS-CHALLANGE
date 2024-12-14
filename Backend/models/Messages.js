const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    name: { type: String, required: true},
    location: {type: String, required: true}, 
    subject: { type: String, required: true},
    message: {type: String, required: true},
    date: { type: Date, default: Date.now }
});


module.exports =mongoose.model('Messages', MessagesSchema);