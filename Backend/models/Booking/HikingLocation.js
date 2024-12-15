const mongoose = require('mongoose');

const HikingLocationSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    guides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guide' }]
});

module.exports = mongoose.model('HikingLocation', HikingLocationSchema);
