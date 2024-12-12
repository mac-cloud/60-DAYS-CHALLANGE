// Import Mongoose
const mongoose = require('mongoose');

// Park Schema (for individual parks within a category)
const ParkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Park name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Park description is required'],
  },
  image: {
    type: String, // Will store the Base64 string or URL of the image
    required: [true, 'Park image is required'],
  },
}, { timestamps: true });

// Category Schema (each category has multiple parks)
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true // To ensure no duplicate category names
  },
  parks: [ParkSchema] // An array of parks for this category
}, { timestamps: true });

// Create Models from Schemas
const Park = mongoose.model('Park', ParkSchema);
const Category = mongoose.model('Category', CategorySchema);

module.exports = { Park, Category };
