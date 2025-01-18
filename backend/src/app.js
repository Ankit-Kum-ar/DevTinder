const express = require('express'); // Import express
const { connectDB } = require('./config/database'); // Import the database connection
const { User } = require('./models/user'); // Import the user model

const app = express(); // Create an express app
app.use(express.json()); // Enable express to parse JSON data

// Signup API endpoint to create a new user in the database using a POST request.
app.post('/signup', async (req,res) => {
    const user = new User(req.body); // Create a new user object with the JSON data sent in the request body.
    try {
        await user.save(); // Save the user object to the database.
        res.send('User created successfully');
        } catch (error) {
        res.status(500).send('Failed to create user'); 
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
app.patch('/user', async (req, res) => {
    const userId = req.body.id; // Get the user ID from the request body.
    const user = req.body; // Get the user object from the request body.
    try {
        await User.findByIdAndUpdate(userId, user); // Find the user by ID and update it with the new user object.
        res.send('User updated successfully');
    } catch (error) {    
        res.status(500).send('Failed to update user');
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