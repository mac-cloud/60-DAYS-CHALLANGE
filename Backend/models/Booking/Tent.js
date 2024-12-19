const mongoose = require('mongoose');

const TentSchema = new mongoose.Schema({
    name: String,
    tentImage: String,
    packageImage: String,
    description: String,
    dayTimePrice: Number,
    nightPrice: Number,
});
const Tent = mongoose.model('Tent', TentSchema);
module.exports = Tent;
