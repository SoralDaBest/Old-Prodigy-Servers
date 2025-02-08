const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000; // Use Render's assigned port (automatically set by Render)

app.use(cors()); // Allow cross-origin requests

// Serve static files from the "public" folder (e.g., index.html, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Example world data
const worlds = [
    { id: 1, full: 76, name: "Fireplane", meta: { tag: "fire" } },
    { id: 2, full: 6, name: "Waterscape", meta: { tag: "water" } },
    { id: 3, full: 42, name: "Earthrealm", meta: { tag: "earth" } }
];

// API route to serve the world data
app.get("/worlds", (req, res) => {
    res.json(worlds); // Send the list of worlds as a JSON response
});

// Root route to serve the homepage (index.html from public folder)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
