require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const noteRoutes = require("./routes/noteRoutes");

const app = express();

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

// Start Server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});