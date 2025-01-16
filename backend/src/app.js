const express = require('express'); // Import express
const { connectDB } = require('./config/database'); // Import the database connection
const app = express(); // Create an express app

const { isAuth } = require('./middleware/auth'); // Import the isAuth middleware
// Dummy authentication middleware
// app.use('/admin', isAuth)

app.use('/', (err, req, res, next) => {
    if(err) {
        res.status(500).send(err.message);
    }
})

app.get('/user', (req, res) => {
    // try {
    //     throw new Error('User not found');
    // } catch (error) {
    //     res.status(404).send(error.message);
    // }
    throw new Error('User not found mkc');
});

app.get('/admin/getUsers', isAuth, (req, res) => {
    res.send('Admin: Here is the list of users');
});

app.get('/admin/deleteUser', (req, res) => {
    res.send('Admin: User deleted');
});



// Start the server on port 3000 and log a message to the console to indicate that the server is running.
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

