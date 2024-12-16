
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes.js');
const bodyParser = require('body-parser');
const multer = require('multer');
const Category = require('./models/Category');
const Messages = require('./models/Messages');
const User = require('./models/User');
const Metrics = require ('./models/Metrics');
const HikingLocation = require('./models/Booking/HikingLocation');
const Guide = require('./models/Booking/Guide');
//const hikingRoutes = require('./routes/hikingRoutes.js');
//const guideRoutes = require('./routes/guideRoutes.js');
require ('dotenv').config();
const path = require('path');
const fs = require('fs');


const app = express ();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true}));
//Middleware
app.use(express.json());
app.use(cors( {
    origin: [ 'http://localhost:3000',
              'http://localhost:3001', 
              'http://localhost:3002'
            ]
}));

//Database connection
const dbURI = 'mongodb://127.0.0.1:27017/test?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3/tourist-db';
mongoose.connect(dbURI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
 })
     .then(() => console.log('MongoDB connected'))
     .catch((error) => console.error('DB connection failed', error));


     const uploadDir = path.join(__dirname, 'uploads');
     if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploaddir);
     }


//Routes
      //POST
     //app.use('/admin', adminRoutes);
    app.use('/api/auth',authRoutes);
   
    //app.use('/api/send', guideRoutes);

    app.post('/api/addcategories', async (req, res) => {
      const { name } = req.body;
    
      if (!name) {
        return res.status(400).json({message: 'Category name is required'});
      }
    
      try {
        const category = new Category({ name, parks: [] });
        await category.save();
        res.status(201).json(category);
      } catch (error ){
        console.error('Error saving category:', error);
        res.status(500).json({ message: 'Server error'});
      } 
    });
  
  
    app.post('/api/parks', async (req, res) => {
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

     //GET
   
    app.get('/categories', async (req, res) => {
      try {
        const categories = await Category.find(); 
        console.log('Categories Fetched:', categories);
        res.status(200).json(categories);
      } catch (error) {
      console.error("Error fetching categories:", error.message);
      console.error("Stack trace:", error.stack);
        res.status(500).json({ error: 'Failed to fetch categories', message: error.message });
      }
    });
  
     //metrics
     app.get('/api/metrics', async (req,res) => {
        try {

          const users = await User.find();
          const metrics = calculateMetrics(users);

          res.json({ users, metrics });
        } catch (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ message: 'Server error' });
        }
     });
     const calculateMetrics = (user) => {
      const dayCounts = {
        'Sunday': 0,
        'Monday': 0,
        'Tuesday': 0,
        'Wednesday': 0,
        'Thursday': 0,
        'Friday': 0,
        'Saturday': 0
      };

      user.forEach(user => {
        if (!user.timestamp) return;
         const date = new Date(user.timestamp);
        
         const dayName = date.toLocaleString('en-US', { weekday: 'long'});
         dayCounts[dayName]++;
      });
      return dayCounts;
     };


     // metrics activities
     // Endpoint to get activity metrics (e.g., weekly signups, logins, and purchases)
app.get('/api/activity-metrics', async (req, res) => {
  try {
      // Get the last 7 days of metrics (can adjust the range)
      const metrics = await Metrics.find().sort({ date: -1 }).limit(7);
      res.json(metrics);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch activity metrics' });
  }
});

// Endpoint to get log entries (e.g., signups, logins, and failed attempts)
app.get('/api/log-entries', async (req, res) => {
  try {
      // Get the latest 20 logs (adjust as needed)
      const logs = await Logs.find().sort({ createdAt: -1 });
      res.json(logs);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch log entries' });
  }
});

// Seed some sample data into MongoDB (for testing purposes)
app.get('/api/seed', async (req, res) => {
  try {
      await Metrics.insertMany([
          { signups: 12, logins: 50, purchases: 5 },
          { signups: 15, logins: 60, purchases: 8 },
          { signups: 9, logins: 70, purchases: 3 },
          { signups: 14, logins: 80, purchases: 7 },
          { signups: 18, logins: 55, purchases: 10 },
          { signups: 20, logins: 90, purchases: 15 },
          { signups: 25, logins: 95, purchases: 20 },
      ]);

      await Log.insertMany([
          { type: 'signup', message: 'User John Doe signed up' },
          { type: 'login', message: 'User Jane Smith logged in' },
          { type: 'failed', message: 'Failed login attempt for user admin' },
          { type: 'signup', message: 'User Bob signed up' },
          { type: 'login', message: 'User Alice logged in' },
          { type: 'failed', message: 'Failed purchase attempt for user Bob' }
      ]);

      res.json({ message: 'Seed data inserted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Failed to seed database' });
  }
});


//contact
app.post('/api/contact',async (req, res) => {
  const { name, location, subject, message } = req.body;

  //validate input field
  if (!name || !location || !subject || !message) {

    return res.status(400).json({ error: 'All fields are required'});
  }
   try {
    const newMessage = new Messages({
      name,
      location,
      subject,
      message,
      date: new Date()
    });
 
    
    await newMessage.save();

    console.log('New message saved to MongoDB:', newMessage);
    res.status(201).json({ message: 'Message received succefully!'});
  } catch (error) {
    console.error('Error saving message to database:', error);
    res.status(500).json({ error: 'Failed to save message to database'});
  }

});
//fetch messages
app.get('/api/messages', async (req,res) => {
  try {
    const messages = await Messages.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages'});
  }
});

//messages count for each day
app.get('/api/weekly-count', async (req, res) => {
  try {

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const messages = await Messages.aggregate([
      {
        $match: { date: { $gte: startOfWeek }}
      },
      {
        $group: {
          _id: { $dayOfWeek: '$date'},
          count: { $sum: 1}
        }
      },
      {
        $sort: { "_id": 1}
      }
    ]);
    res.status(200).json(message);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch weekly messages count'});
  }
});




//Guide account
const storage = multer.diskStorage({
  destination: (req, file, cb) => {

      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()* 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });



// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const  uploadGuideImage = async (req, res) => {
  try {
    const guideId = req.params.id;
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded"});
    }


    const imagePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;


    const updatedGuide = await Guide.findByIdAndUpdate(
      guideId,
      { profileImage: imagePath },
      { new: true }
    );
    if (!updatedGuide) {
      return res.status(404).json({ message: 'Guide not found'});
    }

    res.status(200).json({ message: 'Image uploaded successfully'});
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Server error'});
  }
}

app.post('/api/guide', upload.single('profileImage'), async (req, res) => {
  try {
      const {
          name,
          email,
          password,
          areaOfSpecialization,
          experience,
          description,
          placesVisited
      } = req.body;

      const profileImagePath = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;


      const guide = new Guide({
          name,
          email,
          password,
          areaOfSpecialization,
          experience: parseInt(experience),
          description,
          profileImage: profileImagePath, 
          placesVisited: Array.isArray(placesVisited) ? placesVisited : placesVisited.split(',').map(place => place.trim())
      });

      await guide.save();
      res.status(201).json({ message: 'Guide registered successfully', guide });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error', error });
  }
});
app.post('/upload-image/:id', upload.single('profileImage'),uploadGuideImage );


// GET all guides categorized by area of specialization
app.get('/api/getguides', async (req, res) => {
  try {
      const guides = await Guide.find();
      
      // Group guides by 'areaOfSpecialization'
      const categorizedGuides = guides.reduce((acc, guide) => {
          const area = guide.areaOfSpecialization;
          if (!acc[area]) {
              acc[area] = [];
          }
          acc[area].push(guide);
          return acc;
      }, {});

      res.status(200).json(categorizedGuides);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

//hiking locations 
app.post('/api/locations', upload.single('image'), async (req, res) => {
  try {
    const { name, description, guides } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null;
    const newLocation = new HikingLocation({
      name,
      description,
      image,
      guides: guides.split(',').map(guide => guide.trim())  // Convert comma-separated string to array
    });

    await newLocation.save();
    res.status(201).json({ message: 'Hiking location added successfully!', location: newLocation });
  } catch (error) {
    console.error('Error adding location:', error);
    res.status(500).json({ message: 'Failed to add hiking location', error });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
     console.log(`Server running on port ${PORT}`));







