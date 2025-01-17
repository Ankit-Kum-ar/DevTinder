const express = require('express'); // Import express
const { connectDB } = require('./config/database'); // Import the database connection
const app = express(); // Create an express app
const { User } = require('./models/user'); // Import the user model

app.post('/signup', async (req,res) => {
    const userObj = {
        firstName: 'Shiv',
        lastName: 'Kumar',
        email: 'shiv@gmail.com',
        password: '3324',
        age : 26,
    }

    const user = new User(userObj); // Create a new user object with the user data.
    try {
        await user.save(); // Save the user object to the database.
        res.send('User created successfully'); // Send a success message to the client.
        } catch (error) {
        res.status(500).send('Failed to create user'); // Send an error message to the client.
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