const mongoose = require('mongoose');

// Create a user schema for the database to store the user data.
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true, // The first name is required.
        minlength: 3, // The first name should have a minimum length of 3 characters.
        maxlength: 50, // The first name should have a maximum length of 50 characters.
    },
    lastName: {
        type: String,
        required: true, // The last name is required.
        minlength: 3, // The last name should have a minimum length of 3 characters.
        maxlength: 50, // The last name should have a maximum length of 50 characters.
    },
    email: {
        type: String,
        required: true,
        unique: true, // The email should be unique.
        lowercase: true, // The email should be stored in lowercase. 
        trim: true, // The email should not have any leading or trailing spaces.
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // The password should have a minimum length of 6 characters.
    },
    age: {
        type: Number,
        required: true,
        min: 18, // The minimum age should be 18.
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other", "Male", "Female", "Other"].includes(value)) { // This check ensures that gender is correctly set to one of the three values. 
                throw new Error('This is not a valid');
            }
        },
    },
    photoUrl: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBnqBkkPCNhjTZdcQ6guMnld6S9KxyfhJ6NA&s', // A default value for the photoUrl field if the user does not provide one.
    },
    bio: {
        type: String,
        default: 'This user has not written a bio yet.', // A default value for the bio field if the user does not provide one.
        maxlength: 250, // The bio should have a maximum length of 250 characters.
    },
    skills: {
        type: [String], // An array of strings to store the skills.
        validate(value) {
            if (value.length < 1) { // This check ensures that the user provides at least one skill.
                throw new Error('Please provide at least one skill');
            }
            if (value.length > 10) { // This check ensures that the user provides a maximum of 10 skills.
                throw new Error('You can provide a maximum of 10 skills');
            }
        },
    },
},
{
    timestamps: true, // The timestamps option auto-generates the createdAt and updatedAt fields.
});

// Create a user model using the user schema.
const User = mongoose.model('User', userSchema);

module.exports = { User };