const express = require('express'); // Import express
const { connectDB } = require('./config/database'); // Import the database connection
const { User } = require('./models/user'); // Import the user model

const app = express(); // Create an express app
app.use(express.json()); // Enable express to parse JSON data

app.post('/signup', async (req,res) => {
    const user = new User(req.body); // Create a new user object with the JSON data sent in the request body.
    try {
        await user.save(); // Save the user object to the database.
        res.send('User created successfully');
        } catch (error) {
        res.status(500).send('Failed to create user'); 
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