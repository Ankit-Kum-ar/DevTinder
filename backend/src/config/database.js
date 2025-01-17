const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect('mongodb+srv://Ankit-Kum-ar:Cy4hQZQSDy7R8PpB@backend.abzl8.mongodb.net/devTinder'); // Connecting to cluster.
}

module.exports = { connectDB };