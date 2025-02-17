const express = require('express'); // Import the express package.
const { userAuth } = require('../middleware/auth'); // Import the userAuth middleware.
const { validateEditProfileData } = require('../utils/validation'); // Import the validateEditProfileData function.

const profileRouter = express.Router(); // Create an express router for the profile routes.

profileRouter.use(express.json()); // Enable express to parse JSON data.

// Profile API endpoint to get the user profile using a GET request.
profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try {
        // Get the user object from the request.
        const user = req.user;

        // Send the user object as a response.
        res.send(user);

    } catch (error) {
        res.status(500).send('Failed to get user profile' + error.message); // Send an error message if the user profile retrieval fails.
    }
})

// Profile API endpoint to edit the user profile using a PATCH request.
profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        // 1. Validate the user field data before updating the user profile.
        validateEditProfileData(req); // Validate the user data before updating the user profile.

        // 2. Get the user object from the request.
        const loggedInUser = req.user; // req.user is set by the userAuth middleware.

        // 3. Update the user object with the new data.
        const allowedFields = ['photoUrl', 'bio', 'skills', 'gender']; // Define the fields that can be updated.
        allowedFields.forEach((field) => {
            if (req.body[field]) { // If the field is provided in the request body, update the user object.
                loggedInUser[field] = req.body[field];
            }
        });

        // 4. Save the updated user object to the database.
        await loggedInUser.save(); // Save the updated user object to the database.

        // 5. Send a success response.
        res.status(200).json({
            message: 'User profile updated successfully',
            data: loggedInUser 
        }); // Send a success response with the updated user object.
    } catch (error) {
        res.status(500).send('Failed to update user profile, Error: ' + error.message); // Send an error message if the user profile update fails.
    }
})

// Profile API endpoint to change the password using a PATCH request.
profileRouter.patch('/profile/change-password', userAuth, async (req, res) => {
    try {
        // 1. Get the old password, new password, and confirm password from the request body.
        const { oldPassword, newPassword, confirmPassword } = req.body;

        // 2. Get the user object from the request.
        const loggedInUser = req.user; // req.user is set by the userAuth middleware.

        // 3. Check if the old password matches the hashed password in the database.
        const isPasswordMatch = await loggedInUser.passwordMatch(oldPassword); // Check if the old password matches the hashed password in the database.
        if (!isPasswordMatch) { // If the old password does not match, return an error.
            throw new Error('Invalid Old Password');
        }

        // 4. Check if the new password and confirm password match.
        if (newPassword !== confirmPassword) { // If the new password and confirm password do not match, return an error.
            throw new Error('New Password and Confirm Password do not match');
        }

        // 5. Hash the new password and save it to the database.
        const hashedPassword = await loggedInUser.hashPassword(newPassword); // Hash the new password using bcrypt.
        loggedInUser.password = hashedPassword; // Save the hashed password to the database.
        await loggedInUser.save(); // Save the updated user object to the database.

        // 6. Send a success response.
        res.send('Password changed successfully');
    } catch (error) {
        res.status(500).send('Failed to change password, Error: ' + error.message); // Send an error message if the password change fails.
    }
})

module.exports = profileRouter; // Export the profileRouter to be used in other files.