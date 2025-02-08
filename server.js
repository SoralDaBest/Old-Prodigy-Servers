const express = require("express");
const path = require("path");
const fetch = require("node-fetch"); // We will use node-fetch to fetch data from the GitHub API
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000; // Ensure this works on Render (or your local dev)

app.use(cors()); // Allow cross-origin requests

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Proxy API route to get the world list from the GitHub Pages API
app.get("/worlds", async (req, res) => {
    try {
        // Fetch the world list from the GitHub Pages API
        const response = await fetch("http://xpmuser.github.io/worlds-api/world-list");
        const worldList = await response.json(); // Parse the response as JSON

        // Send the world list to the client
        res.json(worldList);
    } catch (error) {
        console.error("Error fetching world list:", error);
        res.status(500).json({ error: "Failed to fetch world list" });
    }
});

// Root route to serve the homepage (index.html from public folder)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
