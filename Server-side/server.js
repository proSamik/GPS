require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mqtt = require('mqtt');
const moment = require('moment');

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


const parkingSpaces = {
    'parking/space/001': { status: 'vacant', timerStart: null, fee: 0 },
    'parking/space/002': { status: 'vacant', timerStart: null, fee: 0 }
};

mqttClient.on('connect', () => {
    console.log("Connected to MQTT broker");
    mqttClient.subscribe(['parking/space/001', 'parking/space/002']);
});

mqttClient.on('message', (topic, message) => {
    const status = message.toString();
    const space = parkingSpaces[topic];

    console.log(`Received message: ${status} on topic: ${topic}`);
    
    if (status === 'occupied' && space.status === 'vacant') {
        // Start the timer
        space.timerStart = Date.now();
        space.status = 'occupied';
    } else if (status === 'vacant' && space.status === 'occupied') {
        // Stop the timer and calculate fee
        const duration = Date.now() - space.timerStart;
        const hours = duration / (1000 * 10); // 10 seconds as 1 hour
        space.fee = Math.ceil(hours) * 10; // ₹10 per hour
        space.timerStart = null;
        space.status = 'vacant';
    }

    // Notify all connected clients of the update
    io.emit('parking update', { topic, status: space.status, fee: space.fee });
});

app.get('/', (req, res) => {
    res.send('Parking System Server is running');
});

// Setup WebSocket connection
io.on('connection', (socket) => {
    console.log('A client connected');
    socket.emit('initial data', parkingSpaces);
    
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
