const express = require('express'); // Import express
const app = express(); // Create an express app

// Create a route for the root path (/) that sends a response to the client with the text "Hello World" 
app.use('/' , (req, res) => {
    res.send('Hello World');
});

// Start the server on port 3000 and log a message to the console to indicate that the server is running.
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});