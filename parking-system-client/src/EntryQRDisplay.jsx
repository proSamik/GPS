// EntryQRDisplay.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './EntryQRDisplay.css'; // Ensure you have appropriate styles

function EntryQRDisplay() {
    const navigate = useNavigate();
    const location = useLocation();
    const { qrData } = location.state;

    const handleNavigateToMap = () => {
        navigate('/map'); // Redirect to the map page
    };
    
    console.log(qrData)

    return (
        <div className="qr-page">
            <div className="title-box">
                <h1 className="qr-title">Entry QR</h1>
            </div>
                
            <img src={qrData.qrCode} alt="Booking QR Code" className="qr-image" />
            <div className="booking-details-box">
                <p className="qr-id"><strong>Booking ID:</strong> {qrData.bookingId} </p>

                <p className="details-text"> <strong>Status: </strong> {qrData.message} <FaCheckCircle className="success-icon" /></p>

            </div>
            <p className="directions-text">
                Don’t know the route? <span className="link-text" onClick={handleNavigateToMap}>Get Directions</span>
            </p>
            <button className="home-button" onClick={() => navigate('/')}>Go Back to Home Screen</button>
        </div>
    );
}

export default EntryQRDisplay;
