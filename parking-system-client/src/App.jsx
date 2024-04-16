import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');  // Connect to the local server

function App() {
  const [parkingSpaces, setParkingSpaces] = useState({
    'parking/space/001': 'Loading...',
    'parking/space/002': 'Loading...'
  });

  useEffect(() => {
    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('parking update', (data) => {
      console.log('Received data:', data); // Check if this logs correctly
      setParkingSpaces(prevSpaces => {
          console.log(`Updating state for ${data.topic} to ${data.status}`);
          return {
              ...prevSpaces,
              [data.topic]: data.status === "occupied" ? "Occupied " : "Vacant"
          };
      });
  });
  
  

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
        setParkingSpaces({
            'parking/space/001': 'Disconnected',
            'parking/space/002': 'Disconnected'
        });
    });

    return () => {
        socket.off('connect');
        socket.off('parking update');
        socket.off('disconnect');
    };
  }, []);


  return (
    <div>
      <h1>Parking System Status</h1>
      <p>Parking Space 1 Status: {parkingSpaces['parking/space/001']}</p>
      <p>Parking Space 2 Status: {parkingSpaces['parking/space/002']}</p>
    </div>
  );
}

export default App;
