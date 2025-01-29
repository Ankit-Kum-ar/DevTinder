const moongose = require('mongoose'); // Import the mongoose library.

// Define the connection request schema.
const connectionRequestSchema = new moongose.Schema({
    
    // Define the fields of the connection request schema.
    fromUserId: {
        type: moongose.Schema.Types.ObjectId, // Set the data type of the field.
        required: true, // Set the field as required.
        // ref: 'User' // Set the reference to the User model.
    },
    toUserId: {
        type: moongose.Schema.Types.ObjectId, // Set the data type of the field.
        required: true, // Set the field as required.
        // ref: 'User' // Set the reference to the User model.
    },
    status: {
        type: String,
        required: true, // Set the field as required.
        enum: { // Set the enum values for the status field.
            values: ['ignored', 'interested', 'accepted', 'rejected'],
            message: '{VALUE} is incorrect status' // Set the error message for incorrect status values.
        }
    }
}, { timestamps: true } // Set the timestamps option to true.
);

// This concept is called compound index. It is used to prevent the duplicate request. 1 means ascending order. -1 means descending order.
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true }); // Create a unique index on the fromUserId and toUserId fields.

// Write Pre method that work as middleware to prevent the saving of connection request to himself.
connectionRequestSchema.pre('save', function(next) {
    const connectionRequest = this;

    // Check here about that if toUserId is same as fromUserId.
    if ( connectionRequest.fromUserId.equals(connectionRequest.toUserId) ) {
        throw new Error("Can't send connection request to yourself");
    }

    // It is a middleware, So always call next() function.
    next();
})

// Create a connection request model using the connection request schema.
const ConnectionRequest = moongose.model('ConnectionRequest', connectionRequestSchema);

// Export the connection request model.
module.exports = ConnectionRequest;