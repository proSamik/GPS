// SessionDetails.jsx
import React from 'react';
import PaymentComponent from './PaymentComponent';

function SessionDetails({ parkingSpaceId, fee }) {
    return (
        <div>
            <h2>Session Details for Space: P{parkingSpaceId}</h2>
            <p>Total Fee: ₹{fee}</p>
            <PaymentComponent parkingSpaceId={parkingSpaceId} fee={fee} />
        </div>
    );
}

export default SessionDetails;
