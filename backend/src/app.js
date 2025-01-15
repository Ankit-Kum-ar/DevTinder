const express = require('express'); // Import express
const app = express(); // Create an express app

// Create a route for the root path (/) that sends a response to the client with the text "Hello World" 
// app.use('/hello', (req, res) => {
//     res.send('Bye Bro');
// })
// app.use('/hello/2', (req,res) => {
//     res.send('hellow2');
// })
// app.use('/' , (req, res) => {
//     res.send('Hello World');
// });

// app.use('/user', (req, res) => {
//     res.send('User route is working fine');
// });

app.get('/user/:Id/:name/:password', (req, res) => {
    res.send({name: 'John Doe', age: 25}); 
    console.log(req.params);
        
});

app.post('/user', (req, res) => {
    res.send('User POST route is working fine');
});


// Start the server on port 3000 and log a message to the console to indicate that the server is running.
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});