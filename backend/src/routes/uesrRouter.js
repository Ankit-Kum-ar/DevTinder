const express = require('express'); // Import the express package.
const { userAuth } = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const { User } = require('../models/user');
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

userRouter.get('/feed', userAuth, async (req, res) => {
    try {
        /*
            User can see the profiles in feed except
            1. The user itself
            2. The users who have sent requests to the user
            3. The users with whom the user is connected
            4. The users who already ignored the user
            5. The logged-in user send interested request to other users and the request is not accepted yet.
         */

        const loggedInUser = req.user; // Get the logged-in user from the request object.

        // Pagination using page,limit and skip query parameters.
        const page = parseInt(req.query.page) || 1; // Page number.
        let limit = parseInt(req.query.limit) || 10; // Number of users to fetch.
        limit = limit > 50 ? 50 : limit; // Limit the number of users to fetch to 50.

        const skip = (page - 1) * limit; // Number of users to skip.        

        // Fetch the users who have sent requests to the logged-in user.
        const requestsReceived = await ConnectionRequest.find({
            toUserId: loggedInUser._id
        }).select('fromUserId');

        // Fetch the users with whom the logged-in user is connected.
        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: 'accepted' },
                { toUserId: loggedInUser._id, status: 'accepted' }
            ]
        }).select('fromUserId toUserId');

        // Fetch the users who already ignored the logged-in user.
        const ignoredUsers = await ConnectionRequest.find({
            fromUserId: loggedInUser._id,
            status: 'ignored', // status is ignored
        }).select('toUserId');

        // Fetch the users to whom the logged-in user has sent interested requests and the requests are not accepted yet.
        const interestedRequests = await ConnectionRequest.find({
            fromUserId: loggedInUser._id,
            status: 'interested'
        }).select('toUserId');

        // Get the ids of the users who have sent requests to the logged-in user.
        const requestsReceivedIds = requestsReceived.map((request) => request.fromUserId);

        // Get the ids of the users with whom the logged-in user is connected.
        const connectionsIds = connections.map((connection) => {
            if (connection.fromUserId.equals(loggedInUser._id)) {
                return connection.toUserId;
            }
            return connection.fromUserId;
        });

        // Get the ids of the users who already ignored the logged-in user.
        const ignoredUsersIds = ignoredUsers.map((ignoredUser) => ignoredUser.toUserId);

        // Get the ids of the users to whom the logged-in user has sent interested requests and the requests are not accepted yet.
        const interestedRequestsIds = interestedRequests.map((request) => request.toUserId);

        // Fetch the users who are not the logged-in user, have not sent requests to the logged-in user, are not connected to the logged-in user, and have not ignored the logged-in user.
        const users = await User.find({
            _id: {
                $nin: [loggedInUser._id, ...requestsReceivedIds, ...connectionsIds, ...ignoredUsersIds, ...interestedRequestsIds] // $nin is used to exclude the ids of the logged-in user, users who have sent requests to the logged-in user, users with whom the logged-in user is connected, and users who already ignored the logged-in user.
            }
        }).select('firstName lastName age photoUrl skills bio').limit(limit).skip(skip); // Select the firstName, lastName, age, photoUrl, skills, and bio of the users.    

        // Send the users as a response.
        res.send(users);
    } catch (error) {
        res.status(500).send('Failed to fetch feed, Error: ' + error);
    }
})

module.exports = userRouter; // Export the user router.