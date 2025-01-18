const express = require('express'); // Import express
const { connectDB } = require('./config/database'); // Import the database connection
const { User } = require('./models/user'); // Import the user model
const { validateSignUpData } = require('./utils/validation'); // Import the validateSignUpData function
const bcrypt = require('bcrypt'); // Import the bcrypt package

const app = express(); // Create an express app
app.use(express.json()); // Enable express to parse JSON data

// Signup API endpoint to create a new user in the database using a POST request.
app.post('/signup', async (req,res) => {
    try {
        // 1. Validate the user data before creating the user.
        validateSignUpData(req); // Validate the user data before creating the user.

        // 2. Encrypt the password before saving the user.
        const password = req.body.password; // Get the password from the request body.
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcrypt with a salt of 10 rounds.
        console.log(hashedPassword);        

        // 3. Save the user to the database.
        const { firstName, lastName, email, age, skills} = req.body; // Destructure the user data from the request body.
        const user = new User({
            firstName,
            lastName,
            email,
            age,
            password: hashedPassword, // Save the hashed password to the database.
            skills
        }); // Create a new user object with the JSON data sent in the request body.
        await user.save(); // Save the user object to the database.

        res.send('User created successfully');
        } catch (error) {
        res.status(500).send("Error: " + error.message); // Send the error message if the user creation fails.
    } 
})

// Login API endpoint to authenticate a user using a POST request.
app.post('/login', async (req, res) => {
    const { email, password } = req.body; // Get the email and password from the request body.
    try {
        const user = await User.findOne({ email }); // Find the user by email in the database.
        if (!user) { // If the user is not found, return an error.
            throw new Error('Invalid Credentials');
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password); // Compare the password with the hashed password in the database.
        if (!isPasswordMatch) { // If the password does not match, return an error.
            throw new Error('Invalid Password');
        }
        res.send('User authenticated successfully');
    } catch (error) {
        res.status(500).send('Failed to authenticate user');
    }
})


// User API endpoint to get a user from the database using a GET request.
app.get('/user', async (req, res) => {
    const userEmail = req.body.email; // Get the email from the request body
    try {
        const users = await User.find({email: userEmail}); // Fetch the users from the database using the email provided.
        users.length === 0 ? res.status(404).send('User not found') : res.send(users); 
    } catch (error) {
        res.status(500).send('Failed to fetch user');
    }
})

// Feed API endpoint to get all the users from the database using a GET request.
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all the users from the database.
        res.send(users);
    } catch (error) {
        res.status(500).send('Failed to fetch users');
    }
})

// Delete API endpoint to delete a user from the database using a DELETE request.
app.delete('/user', async (req, res) => {
    const userId = req.body.id; // Get the user ID from the request body.
    try {
        await User.findByIdAndDelete(userId); // Find the user by ID and delete it from the database.
        res.send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Failed to delete user');
    }
})

// Update API endpoint to update a user in the database using a PATCH request.
app.patch('/user/:userId', async (req, res) => {
    const userId = req.params?.userId; // Get the user ID from the request parameters. ? is used to avoid errors if userId is not provided.
    const user = req.body; // Get the user object from the request body.
    try {

        const ALLOWED_FIELDS = ['photoUrl', 'bio', 'skills']; // Define the fields that can be updated.
        // Check if the user object contains only the allowed fields.
        const isValidOperation = Object.keys(user).every((field) => ALLOWED_FIELDS.includes(field)); 
        if (!isValidOperation) { // If the user object contains any other field, return an error.
            return res.status(400).send('Invalid fields');
        }

        await User.findByIdAndUpdate(userId, user, {
            runValidators: true, // Run the validators to check the updated user object.
        }); // Find the user by ID and update it with the new user object.

        res.send('User updated successfully');
    } catch (error) {    
        res.status(500).send(error.message); // Send the error message if the user update fails.
    }
}) 

connectDB().then(() => {
    console.log('Connected to the database');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.log('Failed to connect to the database', err);
});