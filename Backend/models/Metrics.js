const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now},
    signups: { type: Number, required: true},
    logins: { type: Number, required: true},
});

module.exports = mongoose.model('Metrics', MetricSchema);



const LogSchema = new mongoose.Schema({
    type: { type: String, enum: ['signup', 'login', 'failed']},
    message: { type:String, required: true},
    createdAt: { type: Date,default: Date.now}
});

module.exports = mongoose.model('Logs', LogSchema);
module.exports = mongoose.model('Metrics', MetricSchema);