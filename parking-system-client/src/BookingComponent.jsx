import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingComponent.css';

function BookingComponent() {
    const [bookingDetails, setBookingDetails] = useState({
        userId: '',
        parkingSpaceId: '',
        date: '',
        time: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBookingDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent the form from refreshing the page
        console.log('Submitting booking details:', bookingDetails);
        try {
            const response = await fetch('http://localhost:3000/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingDetails)
            });
            const data = await response.json();
            console.log('Server response:', data);

            if (response.ok) {
                navigate('/entry-qr', { state: { qrData: data } });  // Redirect to the QR display page with QR data
            } else {
                setMessage(data.message || 'Failed to book parking space.');
            }
        } catch (error) {
            console.error('Error making booking request:', error);
            setMessage('Error making booking request.');
        }
    };

    return (
        <div className="booking-container">
            <h2 className="booking-title">Book Parking Space</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="booking-label">User ID</label>
                    <input type="text" name="userId" value={bookingDetails.userId}
                           onChange={handleChange} required
                           className="booking-input"/>
                </div>
                <div>
                    <label className="booking-label">Parking Space ID</label>
                    <input type="text" name="parkingSpaceId" value={bookingDetails.parkingSpaceId}
                           onChange={handleChange} required
                           className="booking-input"/>
                </div>
                <div>
                    <label className="booking-label">Date</label>
                    <input type="date" name="date" value={bookingDetails.date}
                           onChange={handleChange} required
                           className="booking-input"/>
                </div>
                <div>
                    <label className="booking-label">Time</label>
                    <input type="time" name="time" value={bookingDetails.time}
                           onChange={handleChange} required
                           className="booking-input"/>
                </div>
                <button type="submit" className="booking-button">
                    Book Now
                </button>
            </form>
            {message && <p className="booking-message">{message}</p>}
        </div>
    );
}

export default BookingComponent;
