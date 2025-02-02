const express = require('express');
const { userAuth } = require('../middleware/auth'); 
const ConnectionRequest = require('../models/connectionRequest'); // Import the ConnectionRequest model.
const { User } = require('../models/user');

const requestRouter = express.Router(); // Create an express router for the request routes.

// Request API endpoint to create a new request in the database using a POST request.
requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try {   
                
        // fromUserId is the user who is sending the request.
        const fromUserId = req.user._id; // Get the user ID from the request object.

        // toUserId is the user who is receiving the request.
        const toUserId = req.params?.toUserId; // Get the user ID from the request parameters.

        // Check the both fromUserId and toUserId would not be same, therefore we use the pre() middleware in connectionRequest.js

        // Also check the toUserId is present in our database. Like someone can easily make a false toUserId and make a call
        const toUser = await User.findById(toUserId);
        if( !toUser ) {
            return res.status(404).json({
                message : "User is not existed"
            })
        }

        // status is the status of the request ("interested", "ignored").
        const status = req.params?.status; // Get the status from the request parameters.

        // Check the status type which should be ("interested", "ignored").
        const ALLOWED_FIELDS = ["interested", "ignored"];
        if ( !ALLOWED_FIELDS.includes(status) ) {
            throw new Error('Invalid Status');
        }

        // Also check those cases like if someone sent again the request to the same person.
        // Suppose A send B to request, so B should not send request A. Infact, B should accept or reject it.
        // So these cases will evaluated by us.
        const existedRequest = await ConnectionRequest.findOne({
            $or : [
                { fromUserId, toUserId },
                { fromUserId : toUserId, toUserId : fromUserId }
            ]
        });
        if(existedRequest) {
            throw new Error('Connection Request has already exist.'); 
        }

        // Save the request to the database.
        const newRequest = new ConnectionRequest({ fromUserId, toUserId, status }); // Create a new request object with the JSON data sent in the request body.

        // Save the request object to the database.
        await newRequest.save(); // Save the request object to the database.

        // Send response for both interested and ignored status using dynamic message with usernames.
        if(status === 'interested') {
            return res.status(201).json({
                message: `Request sent to ${toUser.firstName}`
            });
        } else {
            return res.status(201).json({
                message: `Request ignored to ${toUser.firstName}`
            });
        }
    } catch (error) {
        res.status(500).send('Failed to send request, Error: ' + error.message); // Send an error message if the request fails.
    }
})

// Request API endpoint to get all requests of the user using a GET request.
requestRouter.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user; // Get the logged in user from the request object.

        // status is the status of the request ("accepted", "rejected").
        const status = req.params?.status; // Get the status from the request parameters.
        const ALLOWED_FIELDS = ["accepted", "rejected"];
        if ( !ALLOWED_FIELDS.includes(status) ) {
            throw new Error('Invalid Status');
        }


        // Check the requestId present in our database and the person who is loggedIn is the same person who is requested. Also, the status should be interested.
        const requestId = req.params?.requestId; // Get the request ID from the request parameters.
        const request = await ConnectionRequest.findOne({ _id: requestId, toUserId: loggedInUser._id, status: 'interested' }); // Find the request by ID in the database.
        if ( !request ) {
            return res.status(404).json({
                message: "Request is not existed"
            });
        }

        // Update the request status in the database.
        request.status = status; // Set the status of the request to the new status.
        await request.save(); // Save the request object to the database.

        // Send response for both accepted and rejected status using dynamic message with usernames.
        if(status === 'accepted') {
            return res.status(200).json({
                message: `Request accepted from ${loggedInUser.firstName}`
            });
        } else {
            return res.status(200).json({
                message: `Request rejected from ${loggedInUser.firstName}`
            });
        }

        // A sends request to B, so B can accept or reject the request.
        // So, B should be loggedIn to use this API.

        // The status should be interested to use this API.
        
    } catch (error) {
        res.status(500).send('Failed to review request, Error: ' + error.message); // Send an error message if the request fails.
        
    }
})

module.exports = requestRouter; // Export the request router.