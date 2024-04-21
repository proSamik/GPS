import React, { useState } from 'react';

function BookingComponent() {
    const [bookingDetails, setBookingDetails] = useState({
        userId: '',
        parkingSpaceId: '',
        date: '',
        time: ''
    });
    const [qrCode, setQrCode] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBookingDetails(prevDetails => {
            const updatedDetails = { ...prevDetails, [name]: value };
            console.log(`Input change - ${name}: ${value}`, updatedDetails);
            return updatedDetails;
        });
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
                setQrCode(data.qrCode);
                setMessage('Booking successful! Here is your QR Code:');
                console.log('QR Code generated:', data.qrCode);
            } else {
                setMessage('Failed to book parking space.');
                console.log('Booking failed:', data.message);
            }
        } catch (error) {
            console.error('Error making booking request:', error);
            setMessage('Error making booking request.');
        }
    };

    return (
        <div>
            <h1>Book a Parking Space</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    User ID:
                    <input type="text" name="userId" value={bookingDetails.userId} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Parking Space ID:
                    <input type="text" name="parkingSpaceId" value={bookingDetails.parkingSpaceId} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Date:
                    <input type="date" name="date" value={bookingDetails.date} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Time:
                    <input type="time" name="time" value={bookingDetails.time} onChange={handleChange} required />
                </label>
                <br />
                <button type="submit">Book Now</button>
            </form>
            {message && <p>{message}</p>}
            {qrCode && <div><img src={qrCode} alt="Booking QR Code" /></div>}
        </div>
    );
}

export default BookingComponent;
