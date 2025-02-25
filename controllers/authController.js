const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, phoneNumber, email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Check for duplicate users
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const newUser = new User({ name, phoneNumber, email });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};



exports.login = async (req, res) => {
    try {
        console.log('Login Request:', req.body); // Debugging

        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({ message: 'Phone Number is required' });
        }

        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials. User not found!' });
        }

        // Set token expiration to 30 minutes
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ error: err.message });
    }
};


exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};