const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Allow cross-origin requests
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Proxy API route to get the world list from GitHub Pages
app.get("/worlds", async (req, res) => {
    try {
        const response = await fetch("https://xpmuser.github.io/worlds-api/world-list"); // Ensure HTTPS
        if (!response.ok) throw new Error("Failed to fetch world list");

        const worldList = await response.json();
        res.json(worldList);
    } catch (error) {
        console.error("Error fetching world list:", error);
        res.status(500).json({ error: "Failed to fetch world list" });
    }
});

// Root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
