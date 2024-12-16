const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const HikingLocation = require('../models/Booking/HikingLocation');
const multer = require('multer');

// Set up storage for images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

//  new hiking location
router.post('/locations', upload.single('image'), async (req, res) => {
    const { name, description, guides } = req.body;
    const imagePath = req.file ? req.file.path : '';

    try {
        const newLocation = new HikingLocation({
            name,
            description,
            image: imagePath,
            guides: guides.split(',').map(guide => guide.trim())
        });

        await newLocation.save();
        res.status(201).json({ message: 'Hiking location created successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error adding hiking location' });
    }
});


module.exports = router;