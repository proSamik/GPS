import React, { useState, useEffect } from 'react'; // Ensure useState and useEffect are imported

function Timer({ start }) {
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeElapsed(Date.now() - start);
        }, 1000);

        return () => clearInterval(interval);
    }, [start]); // Reacts only if 'start' changes

    return <p>Time Parked: {(timeElapsed / 1000).toFixed(0)} seconds</p>;
}

export default Timer;
