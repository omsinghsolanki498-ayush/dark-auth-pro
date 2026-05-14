require("dotenv").config(); // Load environment variables from .env file

const cookieParser = require("cookie-parser"); // Used to read cookies from browser requests

const express = require("express"); // Import Express framework

const cors = require("cors"); // Import CORS middleware

const connectDB = require("./config/db");

const app = express();

connectDB(); // Connect backend with MongoDB database

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://dark-auth-pro.vercel.app"
    ],
    credentials: true
}));

app.use(express.json()); // Middleware to accept JSON data from frontend
app.use(cookieParser()); // Middleware to read cookies

app.use(express.urlencoded({ extended: true }));

// All auth routes start with /api/auth
app.use("/api/auth", require("./routes/authroutes"));

app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});

app.listen(3002, () => {
    console.log("Server running");
});