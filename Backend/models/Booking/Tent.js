const mongoose = require('mongoose');

const TentSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
});

module.exports = mongoose.model('Tent', TentSchema);