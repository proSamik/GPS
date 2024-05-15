import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Timer from './Timer';
import './ParkingStatus.css'; 
import SessionDetails from './SessionDetails';

function ParkingStatus() {
    const [socket, setSocket] = useState(null);
    const [parkingSpaces, setParkingSpaces] = useState({
        'parking/space/001': { status: 'Loading...', fee: 0, timerStart: null },
        'parking/space/002': { status: 'Loading...', fee: 0, timerStart: null }
    });

    const [selectedSpaceId, setSelectedSpaceId] = useState(null); // State for tracking selected parking space ID
    const [paid, setPaid] = useState(false); // State for tracking payment status


    // Establish the socket connection when the component mounts
    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);
        console.log('Socket initialized');

        return () => {
            newSocket.close();
            console.log('Socket disconnected');
        };
    }, []);

    // Setup listeners for socket events
    useEffect(() => {
        if (socket) {
            socket.on('parking update', (data) => {
                console.log(`Received update for ${data.topic}:`, data);
                setParkingSpaces(prev => ({
                    ...prev,
                    [data.topic]: {
                        ...prev[data.topic],
                        status: data.status,
                        fee: data.fee,
                        timerStart: data.status === 'occupied' && prev[data.topic].status !== 'occupied' ? Date.now() : prev[data.topic].timerStart
                    }
                }));
            });

            socket.on('initial data', (data) => {
                console.log('Received initial data:', data);
                const initialData = {};
                Object.keys(data).forEach(key => {
                    initialData[key] = {
                        ...data[key],
                        timerStart: data[key].status === 'occupied' ? Date.now() : null
                    };
                });
                setParkingSpaces(initialData);
            });

            // Request initial data on connection
            socket.emit('request initial data');

            return () => {
                socket.off('parking update');
                socket.off('initial data');
            };
        }
    }, [socket]);

    const handleSelectSpace = id => {
        setSelectedSpaceId(id); // Set the selected parking space ID
        setPaid(false);  // Reset the paid state when a new space is selected
    };


    return (
        <div>
            <h1 className="title">Parking System Status</h1>
            {Object.entries(parkingSpaces).map(([id, { status, fee, timerStart }]) => (
                <div key={id} className="parking-card" onClick={() => handleSelectSpace(id)}>
                    <h2 className="space-title">Parking Space - P{id.split('/').pop()}</h2>
                    <div className={`status-toggle ${status === 'occupied' ? 'occupied' : 'vacant'}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </div>
                    <p className="fee-info">Fee: ₹{fee}</p>
                    {status === 'occupied' && timerStart && <div className="timer-styled"> <Timer start={timerStart} /> </div>}
                </div>
            ))}
            {selectedSpaceId && (
                <SessionDetails parkingSpaceId={selectedSpaceId.split('/').pop()} fee={parkingSpaces[selectedSpaceId].fee} />
            )}
        </div>
    );


    }
    

export default ParkingStatus;
