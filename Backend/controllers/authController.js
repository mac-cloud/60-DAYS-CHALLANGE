const User = require('../models/User');
const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const salt = await bcryt.gensalt(10);
        const hashedPassword = await bcryt.hash(password, salt);
        
        const user = new User ({ name, email, password: hashedPassword});
        await user.save();

        res.status(201).json({ message: 'User registerd successfully!!'});
    }catch (error) {
        res.status(500).json({ message: 'Error registering user', error})
    }
} ;


exports.login = async (req, res) => {
    try {
        const  { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return req.status(404).json({ message: 'User not found'});

        const isMatch = await bcryt.compare(password, user.password);
        if (!isMatch) return req.status(401).json({ message: 'Invalid Credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expireIn: '1h'});
        res.json({ token });
    }catch (error) {
        res.status(500).json({ message: 'Error logging in', error});
    }
};