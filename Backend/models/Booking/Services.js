const mongoose = require('mongoose');

const ServicesOfferedSchema = new mongoose.Schema({
    serviceName: String,
    serviceDescription: String,
    serviceImage: String,

});

module.exports = mongoose.model('Service', ServicesOfferedSchema);