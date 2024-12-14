const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const User = require('../models/User');
const Category = require('../models/Category');

// User Sign-up Route
router.post('/signup', async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  // Check if all fields are filled
  if (!firstname || !lastname || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists!' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// new category

//router.post('/categories', async (req, res) => {
//  const { name } = req.body;
//
//  if (!name) {
//    return res.status(400).json({message: 'Category name is required'});
//  }
//
//  try {
//    const category = new Category({ name, parks: [] });
//    await category.save();
//    res.status(201).json(category);
//  } catch (error ){
//    console.error('Error saving category:', error);
//    res.status(500).json({ message: 'Server error'});
//  } 
//});

//adding new park to specific category
router.post('/parks', async (req, res) => {
  const { categoryId, park } = req.body;

  if (!categoryId || !park) {
    return res.status(400).json({ message: 'Category ID and park details are required'});

  }
  try {
    const category = await Category.findById(categoryId);

    if (!category)  {
      return res.status(404).json({ message: 'Category not found'});
    }

    category.parks.push(park);
    await category.save();
    res.status(201).json({ message: 'Park added successfully' });
  } catch (error){
    console.error('Error adding park', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// get categories
//router.get('/api/categories', async(req, res) => {
//      try {
//        const categories = await Category.find();
//        res.status(200).json(categories);
//
//      } catch (error) {
//        console.error(error);
//        res.status(500).json({ message: 'Server Error'});
//      }
//});

module.exports = router;
