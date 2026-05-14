const mongoose = require("mongoose");

// function to connect to mongoDb database
const connectDB = async () => {
    try {
         // Connect MongoDB using connection string from .env
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Database Connected");
    } catch (error) {
        console.log("DB Error:", error.message);
    }
};

module.exports = connectDB;