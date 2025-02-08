const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS

// Example world data
const worlds = [
    { id: 1, full: 76, name: "Fireplane", meta: { tag: "fire" } },
    { id: 2, full: 6, name: "Waterscape", meta: { tag: "water" } },
    { id: 3, full: 42, name: "Earthrealm", meta: { tag: "earth" } }
];

// Default route to show a welcome message
app.get("/", (req, res) => {
    res.send("Welcome to the Prodigy World Server! Use /worlds to get the list of worlds.");
});

// API endpoint to get the world list
app.get("/worlds", (req, res) => {
    res.json(worlds);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
