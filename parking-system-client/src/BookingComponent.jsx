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
            const response = await fetch('http://192.168.134.7:3000/book', {
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
        <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Book Parking Space</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">User ID</label>
                    <input type="text" name="userId" value={bookingDetails.userId}
                           onChange={handleChange} required
                           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Parking Space ID</label>
                    <input type="text" name="parkingSpaceId" value={bookingDetails.parkingSpaceId}
                           onChange={handleChange} required
                           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" name="date" value={bookingDetails.date}
                           onChange={handleChange} required
                           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <input type="time" name="time" value={bookingDetails.time}
                           onChange={handleChange} required
                           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
                <button type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Book Now
                </button>
            </form>
            {message && <p className="text-center">{message}</p>}
            {qrCode && <div className="text-center mt-4"><img src={qrCode} alt="Booking QR Code" className="mx-auto" /></div>}
        </div>
    );
}

export default BookingComponent;
