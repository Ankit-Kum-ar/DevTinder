const express = require('express'); // Import express
const { connectDB } = require('./config/database'); // Import the database connection
const cookieParser = require('cookie-parser'); // Import the cookie-parser package
const authRouter = require('./routes/authRouter'); // Import the authRouter
const profileRouter = require('./routes/profileRouter'); // Import the profileRouter
const requestRouter = require('./routes/requestRouter'); // Import the requestRouter
const userRouter = require('./routes/uesrRouter');
const cors = require('cors');

const app = express(); // Create an express app

app.use(express.json()); // Enable express to parse JSON data
app.use(cookieParser()); // Enable express to parse cookies
app.use(cors({
    origin: 'http://localhost:5173', // Allow the frontend to access this server.
    credentials: true, // Enable credentials to allow cookies from the frontend to be sent to the server.
})); // Enable CORS for all routes

app.use('/', authRouter); // Use the authRouter for the / route
app.use('/', profileRouter); // Use the profileRouter for the / route
app.use('/', requestRouter); // Use the requestRouter for the / route
app.use('/', userRouter); // Use the userRouter for the / route

// User API endpoint to get a user from the database using a GET request.
// app.get('/user', userAuth, async (req, res) => {
//     const userEmail = req.body.email; // Get the email from the request body
//     try {
//         const users = await User.find({email: userEmail}); // Fetch the users from the database using the email provided.
//         users.length === 0 ? res.status(404).send('User not found') : res.send(users); 
//     } catch (error) {
//         res.status(500).send('Failed to fetch user');
//     }
// })

// Feed API endpoint to get all the users from the database using a GET request.
// app.get('/feed', userAuth, async (req, res) => {
//     try {
//         const users = await User.find(); // Fetch all the users from the database.
//         res.send(users);
//     } catch (error) {
//         res.status(500).send('Failed to fetch users');
//     }
// })

// Delete API endpoint to delete a user from the database using a DELETE request.
// app.delete('/user', userAuth, async (req, res) => {
//     const userId = req.body.id; // Get the user ID from the request body.
//     try {
//         await User.findByIdAndDelete(userId); // Find the user by ID and delete it from the database.
//         res.send('User deleted successfully');
//     } catch (error) {
//         res.status(500).send('Failed to delete user');
//     }
// })

// Update API endpoint to update a user in the database using a PATCH request.
// app.patch('/user/:userId', userAuth, async (req, res) => {
//     const userId = req.params?.userId; // Get the user ID from the request parameters. ? is used to avoid errors if userId is not provided.
//     const user = req.body; // Get the user object from the request body.
//     try {

//         const ALLOWED_FIELDS = ['photoUrl', 'bio', 'skills']; // Define the fields that can be updated.
//         // Check if the user object contains only the allowed fields.
//         const isValidOperation = Object.keys(user).every((field) => ALLOWED_FIELDS.includes(field)); 
//         if (!isValidOperation) { // If the user object contains any other field, return an error.
//             return res.status(400).send('Invalid fields');
//         }

//         await User.findByIdAndUpdate(userId, user, {
//             runValidators: true, // Run the validators to check the updated user object.
//         }); // Find the user by ID and update it with the new user object.

//         res.send('User updated successfully');
//     } catch (error) {    
//         res.status(500).send(error.message); // Send the error message if the user update fails.
//     }
// }) 

connectDB().then(() => {
    console.log('Connected to the database');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.log('Failed to connect to the database', err);
});