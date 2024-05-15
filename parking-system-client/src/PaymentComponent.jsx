import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentComponent.css'; // Import the new CSS file

function PaymentComponent({ parkingSpaceId, fee }) {
    const [paid, setPaid] = useState(false);
    const navigate = useNavigate();

    const handlePayment = () => {
        const paymentData = JSON.stringify({
            userId: parkingSpaceId,
            amountPaid: fee,
            status: "Successful"
        });
        setPaid(true);
        navigate('/qrdisplay', { state: { qrData: paymentData } });
    };

    return (
        <div className="payment-overlay">
            <div className="payment-box">
                {paid ? (
                    <p className="payment-text">Redirecting to QR code...</p>
                ) : (
                    <>
                        <p className="payment-text">Pay ₹{fee} to complete your parking session.</p>
                        <button className="payment-button" onClick={handlePayment}>Pay ₹{fee}</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default PaymentComponent;
