const mongoose = require('mongoose');


const ParkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true}
});


const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parks: [ParkSchema]
});
const Category = mongoose.model('Category', CategorySchema, 'categories');

module.exports = Category;