const mongoose = require('mongoose');

const HikingLocationSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    guides: [{ type: String }]
});

module.exports = mongoose.model('HikingLocation', HikingLocationSchema);











