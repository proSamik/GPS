function Timer({ start }) {
        const [timeElapsed, setTimeElapsed] = useState(0);
    
        useEffect(() => {
            const interval = setInterval(() => {
                setTimeElapsed(Date.now() - start);
            }, 1000);
    
            return () => clearInterval(interval);
        }, [start]); // Ensure the interval is reset only if the start time actually changes
    
        return <p>Time Parked: {(timeElapsed / 1000).toFixed(0)} seconds</p>;
    }
    