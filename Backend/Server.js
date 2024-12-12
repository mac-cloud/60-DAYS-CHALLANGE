
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes.js');
const bodyParser = require('body-parser');
require ('dotenv').config();


const app = express ();

//Middleware
app.use(express.json());
app.use(cors());
//app.use('/uploads', express.static('uploads'));

//Database connection
const dbURI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3/tourist-db';
mongoose.connect(dbURI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
 })
     .then(() => console.log('MongoDB connected'))
     .catch((error) => console.error('DB connection failed', error));

//Routes
     //app.use('/admin', adminRoutes);
     app.use('/api/auth',authRoutes);
    app.post('/api/categories', async (req, res) => {
     try {
          const newCategory = new Category(req.body);
          const savedCategory = await newCategory.save();
          res.status(201).json(savedCategory);
     } catch (error) {

          res.status(500).json({ error: 'Error saving category'});
     }
    });
    app.post('/api/parks', async (req, res) => {

     try {
          const { categoryId, park } = req.body;
          const category = await Category.findById(categoryId);

          if (category) {
               category.parks.push(park);
               const updatedCategory = await category.save();
               res.status(201).json(updatedCategory);
          } else {
               res.status(404).json({ error: 'Category not found'});
          } 
     } catch (error) {
          res.status(500).json({ error: 'Error saving park'});
     }
    });

   
// Mongoose schema nad models
const ParkSchema = new mongoose.Schema({
     name: String,
     description: String,
     image: String
});

const CategorySchema = new mongoose.Schema({
     name: String,
     parks: [ParkSchema]
});

const Category = mongoose.model('Category, CategorySchema');


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
     console.log(`Server running on port ${PORT}`));









