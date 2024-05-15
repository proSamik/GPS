import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
import './QRDisplay.css';
import { FaCheckCircle } from 'react-icons/fa';

function QRDisplay() {
    const navigate = useNavigate();
    const location = useLocation();
    const qrData = JSON.parse(location.state.qrData); // Ensure to parse the stringified JSON data

    const handleNavigateToMap = () => {
        navigate('/map'); // Redirect to the map page
    };

    return (
        <div className="qr-page">
            <div className="title-box">
                <h1 className="qr-title">Payment Successful</h1>
            </div>
            <QRCode value={location.state.qrData} size={256}alt="Booking QR Code" className="qr-image"/>

            <div className="booking-details-box">
                <p className="qr-id"><strong>Parking ID:</strong> {qrData.userId} </p>

              
                <p className="details-text"><strong> Amount Paid: </strong>₹{qrData.amountPaid}</p>

                <p className="details-text"> <strong>Status: </strong>{qrData.status} <FaCheckCircle className="success-icon" /></p>
            </div>
            <p className="directions-text">
                Don’t know the route? <span className="link-text" onClick={handleNavigateToMap}>Get Directions</span>
            </p>
            <button className="home-button" onClick={() => navigate('/')}>Go Back to Home Screen</button>
        </div>
    );
}

export default QRDisplay;
