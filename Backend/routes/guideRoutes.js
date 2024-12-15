const express = require('express');
const router = express.Router();
const multer = require('multer');
const Guide = require('../models/Booking/Guide')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()* 1E9);
        cb(null, uniqueSuffix + '-' + fileoriginalname);
    }
});
const upload = multer({ storage: storage });


router.post('/guide', upload.single('profileImage'), async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            areaOfSpecialization,
            yearsOfExperience,
            description,
            placesVisited
        } = req.body;

        // Create a new Guide document
        const guide = new Guide({
            name,
            email,
            password,
            areaOfSpecialization,
            yearsOfExperience,
            description,
            profileImage: req.file.path, // Path of the uploaded file
            placesVisited: placesVisited.split(',').map(place => place.trim()) // Convert string to array
        });

        await guide.save();
        res.status(201).json({ message: 'Guide registered successfully', guide });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;