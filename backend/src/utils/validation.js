const validator = require('validator'); // Import the validator package.
const validateSignUpData = (req) => {
    const {firstName, lastName, email, password, age} = req.body; // Destructure the first name, last name, email, password, and age from the request body.

    if (!firstName || !lastName || !email || !password || !age) { // Check if any of the required fields are missing.
        throw new Error('All fields are required'); // Throw an error if any of the required fields are missing.
    }
    else if (firstName.length < 3 || lastName.length < 3) { // Check if the first name or last name is less than 3 characters.
        throw new Error('First name and last name should have a minimum length of 3 characters'); // Throw an error if the first name or last name is less than 3 characters.
    }
    else if (age < 18) { // Check if the age is less than 18.
        throw new Error('You must be 18 or older to sign up'); // Throw an error if the age is less than 18.
    }
    else if (!validator.isEmail(email)) { // Check if the email is a valid email address.
        throw new Error('This is not a valid email address'); // Throw an error if the email is not valid.
    }
    else if (!validator.isStrongPassword(password)) { // Check if the password is strong.
        throw new Error('The password is not strong enough'); // Throw an error if the password is not strong.
    }
}

const validateEditProfileData = (req) => {
    const ALLOWED_FIELDS = [ 'photoUrl', 'bio', 'skills', 'gender']; // Define the fields that can be updated.
    
    // Check if the user object contains only the allowed fields.
    const isAllowedField = Object.keys(req.body).every((field) => ALLOWED_FIELDS.includes(field));

    if (!isAllowedField) { // If the user object contains any other field, return an error.
        throw new Error('Invalid fields');
    }
}

module.exports = { validateSignUpData, validateEditProfileData }; // Export the validateSignUpData function to be used in other files.