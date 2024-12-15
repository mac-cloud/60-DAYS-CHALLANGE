const mongoose = require('mongoose');

const GuideSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    areaOfSpecialization: {type: String, required: true},
    experience: {type: Number, required: true},
    description: {type: String, required: true},
    profileImage: {type: String, required: true},
    placesVisited: [{type: String, required: true}],
});


const Guide = mongoose.model('Guide', GuideSchema);

module.exports = Guide;