const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true } // Ensure email is required!
});

module.exports = mongoose.model('User', UserSchema);
