import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import moment from 'moment';

const containerStyle = {
  width: '800px',
  height: '400px'
};

const center = {
  lat: -34.397,
  lng: 150.644
};

const parkingSpaces = [
  { id: 1, position: { lat: -34.397, lng: 150.644 } },
  { id: 2, position: { lat: -34.390, lng: 150.644 } }
];

const BookingInterface = () => {
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    startDate: moment().format('YYYY-MM-DD'),
    startTime: moment().format('HH:mm'),
    endDate: moment().format('YYYY-MM-DD'),
    endTime: moment().add(1, 'hours').format('HH:mm')
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Booking Details: ", bookingDetails);
    console.log("Selected Parking Space: ", selectedSpace);
    // Here you would typically send the booking data to your server
  };

  return (
    <div>
      <LoadScript
        googleMapsApiKey="YOUR_API_KEY" // Replace with your Google Maps API key
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {parkingSpaces.map(space => (
            <Marker 
              key={space.id} 
              position={space.position} 
              onClick={() => setSelectedSpace(space.id)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      <form onSubmit={handleSubmit}>
        <h2>Book a Parking Space</h2>
        <label>
          Start Date:
          <input type="date" name="startDate" value={bookingDetails.startDate} onChange={handleInputChange} />
        </label>
        <label>
          Start Time:
          <input type="time" name="startTime" value={bookingDetails.startTime} onChange={handleInputChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="endDate" value={bookingDetails.endDate} onChange={handleInputChange} />
        </label>
        <label>
          End Time:
          <input type="time" name="endTime" value={bookingDetails.endTime} onChange={handleInputChange} />
        </label>
        <button type="submit">Book</button>
      </form>
      {selectedSpace && <p>Selected Parking Space ID: {selectedSpace}</p>}
    </div>
  );
};

export default BookingInterface;
