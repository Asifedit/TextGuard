const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
            expiresIn: "1h",
        });
        res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    try {
        const user = await User.findOne({ username });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        console.log(user);
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
            expiresIn: "1h",
        });

        res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token =
        req.cookies.token ||
        req.body.token ||
        req.query.token ||
        req.headers["x-access-token"];
    if (!token) {
        return res
            .status(403)
            .json({ message: "Token is required for authentication" });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.decoded = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

// Save data
router.post("/saveData", verifyToken, async (req, res) => {
    const { topic, data } = req.body;
    const userId = req.decoded.userId;
    try {
        const user = await User.findById(userId);
        user.savedData.push({ topic, data });
        await user.save();
        res.status(200).json({
            message: "Data saved successfully",
            savedData: user.savedData,
        });
    } catch (error) {
        console.error("Error saving data", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get saved data
router.get("/getData", verifyToken, async (req, res) => {
    const userId = req.decoded.userId;
    try {
        const user = await User.findById(userId);
        res.status(200).json({ savedData: user.savedData });
    } catch (error) {
        console.error("Error fetching data", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete saved data item
router.delete("/deleteData/:id", verifyToken, async (req, res) => {
    const userId = req.decoded.userId;
    const { id } = req.params;
    try {
        const user = await User.findById(userId);
        user.savedData = user.savedData.filter(
            (item) => item._id.toString() !== id
        );
        await user.save();
        res.status(200).json({
            message: "Data deleted successfully",
            savedData: user.savedData,
        });
    } catch (error) {
        console.error("Error deleting data", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Update data endpoint
router.put("/updateData/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const { topic, data } = req.body;

    try {
        const user = await User.findOne({ "savedData._id": id });
        if (!user) {
            return res.status(404).send("User not found");
        }

        const item = user.savedData.id(id);
        if (!item) {
            return res.status(404).send("Item not found");
        }

        item.topic = topic;
        item.data = data;
        await user.save();

        res.json({ savedData: user.savedData });
    } catch (error) {
        console.error("Error updating data", error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
