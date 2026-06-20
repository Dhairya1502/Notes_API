require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const noteRoutes = require("./routes/noteRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// CORS
app.use(cors({
    origin: "*"
}));

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Notes API");
});

// About Route
app.get("/about", (req, res) => {
    res.send("This is Dhairya's Notes API");
});

// Notes Routes
app.use("/notes", noteRoutes);

// Auth Routes
app.use("/auth", authRoutes);

// Start Server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});