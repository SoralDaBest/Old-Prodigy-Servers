const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 3000;

// Sample world data
let worlds = [
    { id: 1, full: 76, name: "Fireplane", meta: { tag: "fire" }, players: [] },
    { id: 2, full: 6, name: "Waterscape", meta: { tag: "water" }, players: [] },
    { id: 3, full: 42, name: "Earthrealm", meta: { tag: "earth" }, players: [] }
];

// Serve static files (index.html, game.min.js, worlds.js, etc.)
app.use(express.static(path.join(__dirname, "public")));

// API endpoint to get world list
app.get("/worlds", (req, res) => {
    res.json(worlds);
});

// Handle WebSocket connections
wss.on("connection", (ws) => {
    console.log("New player connected");

    // Send world data on connection
    ws.send(JSON.stringify({ type: "world_list", worlds }));

    ws.on("message", (message) => {
        try {
            let data = JSON.parse(message);

            if (data.type === "join_world") {
                let world = worlds.find(w => w.id === data.worldId);
                if (world) {
                    world.players.push(ws);
                    world.full = Math.min(100, world.full + 5); // Increase world capacity
                    console.log(`Player joined ${world.name}, now ${world.players.length} players`);

                    ws.send(JSON.stringify({ type: "joined", worldId: world.id, worldName: world.name }));

                    // Broadcast updated world info to all players
                    broadcastWorlds();
                } else {
                    ws.send(JSON.stringify({ type: "error", message: "World not found" }));
                }
            }
        } catch (error) {
            console.error("Invalid message received:", message);
        }
    });

    ws.on("close", () => {
        console.log("Player disconnected");
        worlds.forEach(world => {
            world.players = world.players.filter(player => player !== ws);
            world.full = Math.max(0, world.full - 5);
        });

        broadcastWorlds();
    });
});

// Function to broadcast updated world data to all connected clients
function broadcastWorlds() {
    const data = JSON.stringify({ type: "world_list", worlds });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
