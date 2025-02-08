const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Example world data
const worlds = [
    { id: 1, full: 76, name: "Fireplane", meta: { tag: "fire" } },
    { id: 2, full: 6, name: "Waterscape", meta: { tag: "water" } },
    { id: 3, full: 42, name: "Earthrealm", meta: { tag: "earth" } }
];

// API endpoint to get the world list
app.get("/worlds", (req, res) => {
    res.json(worlds);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
