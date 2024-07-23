const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");

// Load environment variables from .env file
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

let logenter = []
// Conditional logging middleware
const myLogger = function (req, res, next) {
    console.log(req.url,req.ip);
   
    next()
};

app.use(myLogger); // Apply conditionally if needed

app.get("/", (req, res) => {
    res.send("ok");
})
// Routes
app.use("/api/users", userRoutes);
app.get('/health', (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));