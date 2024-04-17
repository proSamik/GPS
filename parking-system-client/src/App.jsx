import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');  // Connect to the local server

function App() {
  const [parkingSpaces, setParkingSpaces] = useState({
      'parking/space/001': { status: 'Loading...', fee: 0 },
      'parking/space/002': { status: 'Loading...', fee: 0 }
  });

  useEffect(() => {
    socket.on('parking update', (data) => {
        setParkingSpaces(prev => ({
            ...prev,
            [data.topic]: { status: data.status, fee: data.fee }
        }));
    });

  //   socket.on('parking update', (data) => {
  //     console.log('Received data:', data); // Check if this logs correctly
  //     setParkingSpaces(prevSpaces => {
  //         console.log(`Updating state for ${data.topic} to ${data.status}`);
  //         return {
  //             ...prevSpaces,
  //             [data.topic]: data.status === "occupied" ? "Occupied " : "Vacant"
  //         };
  //     });
  // });
    
  socket.on('initial data', (data) => {
    setParkingSpaces(data);
});

return () => {
  socket.off('parking update');
  socket.off('initial data');
};
}, []);
  
  

  //   socket.on('disconnect', () => {
  //       console.log('Disconnected from server');
  //       setParkingSpaces({
  //           'parking/space/001': 'Disconnected',
  //           'parking/space/002': 'Disconnected'
  //       });
  //   });

  //   return () => {
  //       socket.off('connect');
  //       socket.off('parking update');
  //       socket.off('disconnect');
  //   };
  // }, []);


  return (
    <div>
        <h1>Parking System Status</h1>
        {Object.entries(parkingSpaces).map(([id, { status, fee }]) => (
            <p key={id}>{id} - Status: {status}, Fee: ₹{fee}</p>
        ))}
    </div>
);
}

export default App;
