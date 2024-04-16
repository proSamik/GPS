const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mqtt = require('mqtt');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Connect to MQTT broker
const mqttClient = mqtt.connect('mqtt://91.121.93.94'); // Use your MQTT broker IP

mqttClient.on('connect', () => {
    console.log("Connected to MQTT broker");
    mqttClient.subscribe(['parking/space/001', 'parking/space/002']);
});

mqttClient.on('message', (topic, message) => {
    console.log(`Received message: ${message.toString()} on topic: ${topic}`);
    // Emit message to all connected Socket.IO clients
    io.emit('parking update', { topic, status: message.toString() });
});

app.get('/', (req, res) => {
    res.send('Parking System Server is running');
});

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
