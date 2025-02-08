const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000; // Use Render's assigned port

app.use(cors()); // Allow cross-origin requests
app.use(express.static(path.join(__dirname, "public")));

// Example world data
const worlds = [
    { id: 1, full: 76, name: "Fireplane", meta: { tag: "fire" } },
    { id: 2, full: 6, name: "Waterscape", meta: { tag: "water" } },
    { id: 3, full: 42, name: "Earthrealm", meta: { tag: "earth" } }
];

app.get("/worlds", (req, res) => {
    res.json(worlds);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
