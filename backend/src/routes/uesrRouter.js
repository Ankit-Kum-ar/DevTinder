const express = require('express'); // Import the express package.
const { userAuth } = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter = express.Router(); // Create an express router for the user routes.

// Define a route to fetch the requests sent by the logged-in user.
userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user; // Get the logged-in user from the request object.

        // Fetch all the requests received by the logged-in user.
        const requests = await ConnectionRequest.find({
             toUserId: loggedInUser._id,
             status: 'interested'
        }).populate('fromUserId', 'firstName lastName age photoUrl gender bio skills'); // Purpose of Populate is to get the user details of the sender.

        // Send the requests as a response with the user details of the sender.
        res.send(requests.map((request) => ({
            _id: request._id,
            fromUser: request.fromUserId,
            status: request.status
        })));
    } catch (error) {
        res.status(500).send('Failed to fetch requests');
    }
})

userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user; // Get the logged-in user from the request object.

        // Fetch all the connections of the logged-in user.
        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: 'accepted' },
                { toUserId: loggedInUser._id, status: 'accepted' }
            ]
        }).populate('fromUserId toUserId', 'firstName lastName age photoUrl skills bio'); // Purpose of Populate is to get the user details of the sender and receiver.

        // data holds information of the connections such as firstName, lastName, age, photoUrl of the connections of the logged-in user.
        const data = connections.map((connection) => {
            let user = connection.fromUserId;
            if (user._id.equals(loggedInUser._id)) {
                user = connection.toUserId;
            }
            return {
                _id: connection._id,
                user // user is the user details of the sender and receiver.
            }
        });

        // Send the connections as a response with the user details of the sender and receiver.
        res.send(data);
    } catch (error) {
        res.status(500).send('Failed to fetch connections');
    }
})

module.exports = userRouter; // Export the user router.