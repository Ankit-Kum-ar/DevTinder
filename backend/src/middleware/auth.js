const jwt = require('jsonwebtoken'); // Import the jsonwebtoken package
const { User } = require('../models/user'); // Import the user model

const userAuth = async (req, res, next) => {
    try {
        // Get the token from the request cookies.
        const { token } = req.cookies;

        // If the token is not found, return an error.
        if (!token) {
            throw new Error('Token not found');
        }

        // Verify the token using the secret key.
        const decoded = jwt.verify(token, 'DevTinder@2511');

        // Find the user by ID in the database.
        const user = await User.findById(decoded._id);

        // If the user is not found, return an error.
        if (!user) {
            throw new Error('User not found');
        }

        // Add the user object to the request.
        req.user = user;

        next(); // Call the next middleware.

    } catch (error) {
        res.status(400).send('Error: Please authenticate');
    }
}

module.exports = { userAuth };