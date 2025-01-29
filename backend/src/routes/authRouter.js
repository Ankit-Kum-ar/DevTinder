const express = require('express');
const { validateSignUpData } = require('../utils/validation'); // Import the validateSignUpData function from the validation file.
const bcrypt = require('bcrypt'); // Import the bcrypt package.
const { User } = require('../models/user'); // Import the User model.

const authRouter = express.Router(); // Create an express router for the auth routes.

// Signup API endpoint to create a new user in the database using a POST request.
authRouter.post('/signup', async (req, res) => {
    try {
        // 1. Validate the user data before creating the user.
        validateSignUpData(req); // Validate the user data before creating the user.

        // 2. Encrypt the password before saving the user.
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password using bcrypt with a salt of 10 rounds.

        // 3. Save the user to the database.
        const { firstName, lastName, email, age, skills } = req.body; // Destructure the user data from the request body.
        const user = new User({
            firstName,
            lastName,
            email,
            password : hashedPassword, // Save the hashed password to the database.
            age,
            skills
        }); // Create a new user object with the JSON data sent in the request body.
        user.save(); // Save the user object to the database.
        res.send('User created successfully');

    } catch (error) {
        res.status(500).send('Failed to create user, Error: ' + error.message); // Send an error message if the user creation fails.
    }
})


// Login API endpoint to authenticate a user using a POST request.
authRouter.post('/login', async (req, res) => {
    try {
        // 1. Get the email and password from the request body.
        const { email, password } = req.body;

        // 2. Find the user by email in the database then check if the password matches the hashed password in the database.
        const user = await User.findOne({ email }); // Find the user by email in the database.
        if (!user) { // If the user is not found, return an error.
            throw new Error('Invalid Credentials');
        }
        const isPasswordMatch = await user.passwordMatch(password); // Check if the password matches the hashed password in the database.
        if (!isPasswordMatch) { // If the password does not match, return an error.
            throw new Error('Invalid Password');
        }

        // 3. Generate a JWT token for the user.
        const token = await user.getJWT(); // Generate a JWT token for the user. 

        // 4. Set a cookie with the token value.
        res.cookie('token', token,); // Set a cookie with the token value.
        res.send('User authenticated successfully');
    } catch (error) {
        res.status(500).send('Failed to authenticate user, Error: ' + error.message); // Send an error message if the user authentication fails.
    }
})

// Logout API endpoint to clear the JWT token from the cookie using a POST request.
authRouter.post('/logout', async (req, res) => {
    try {
        res.clearCookie('token'); // Clear the JWT token from the cookie.
        res.send('User logged out successfully');
    } catch (error) {
        res.status(500).send('Failed to logout user, Error: ' + error.message); // Send an error message if the user logout fails.
    }
})

module.exports = authRouter; // Export the authRouter for use in other files.