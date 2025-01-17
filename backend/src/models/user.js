const mongoose = require('mongoose');

// Create a user schema for the database to store the user data.
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
});

// Create a user model using the user schema.
const User = mongoose.model('User', userSchema);

module.exports = { User };