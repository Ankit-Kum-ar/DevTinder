const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Create a user schema for the database to store the user data.
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        index: true, // The first name should be indexed for faster search queries.
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
        unique: true, // The email should be unique. Unique automatically creates an index on the email field.
        lowercase: true, // The email should be stored in lowercase. 
        trim: true, // The email should not have any leading or trailing spaces.
        validate(value) {
            if (!validator.isEmail(value)) { // This check ensures that the email is a valid email address.
                throw new Error('This is not a valid email address');
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) { // This check ensures that the password is strong.
                throw new Error('The password is not strong enough');
            }
        }
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
        validate(value) {
            if (!validator.isURL(value)) { // This check ensures that the photoUrl is a valid URL.
                throw new Error('This is not a valid URL' + value);
            }
        }
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

userSchema.index({ firstName: 1, lastName: 1 }); // Create a compound index on the firstName and lastName fields.

userSchema.methods.getJWT = async function () {
    return await jwt.sign({ _id: this._id }, 'DevTinder@2511', { expiresIn: '7 days' });
}
userSchema.methods.passwordMatch = async function (password) {
    return await bcrypt.compare(password, this.password); // Order of arguments is important.
}
userSchema.methods.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10); // Hash the password using bcrypt with a salt of 10 rounds.
}


// Create a user model using the user schema.
const User = mongoose.model('User', userSchema);

module.exports = { User };