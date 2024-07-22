const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");

// Load environment variables from .env file
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Conditional logging middleware
const myLogger = function (req, res, next) {
    if (req.path.startsWith("/api/users")) {
        console.log("Request to /api/users received at: ", new Date());
    }
    next();
};

app.use(myLogger); // Apply conditionally if needed

// Routes
app.use("/api/users", userRoutes);

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
