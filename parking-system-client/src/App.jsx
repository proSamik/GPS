import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Timer from './Timer';

// Establish a connection to the server
const socket = io('http://localhost:3000');

function App() {
    // State to hold parking space data
    const [parkingSpaces, setParkingSpaces] = useState({
        'parking/space/001': { status: 'Loading...', fee: 0, timerStart: null },
        'parking/space/002': { status: 'Loading...', fee: 0, timerStart: null }
    });

    // Effect to handle real-time updates from the server
    useEffect(() => {
      socket.on('parking update', (data) => {
        setParkingSpaces(prev => ({
            ...prev,
            [data.topic]: {
                ...prev[data.topic],
                status: data.status,
                fee: data.fee,
                timerStart: data.status === 'occupied' && prev[data.topic].status === 'vacant' ? Date.now() : prev[data.topic].timerStart
            }
        }));
    });

        socket.on('initial data', (data) => {
            // Initialize parking space state with data from the server
            const initialData = {};
            Object.keys(data).forEach(key => {
                initialData[key] = {
                    ...data[key],
                    timerStart: data[key].status === 'occupied' ? Date.now() : null
                };
            });
            setParkingSpaces(initialData);
        });

        return () => {
            socket.off('parking update');
            socket.off('initial data');
        };
    }, []);

    return (
      <div>
          <h1>Parking System Status</h1>
          {Object.entries(parkingSpaces).map(([id, { status, fee, timerStart }]) => (
              <div key={id}>
                  <p>{id} - Status: {status}, Fee: ₹{fee}</p>
                  {status === 'occupied' && timerStart &&
                      <Timer start={timerStart} />
                  }
              </div>
          ))}
      </div>
  );
}




export default App;
