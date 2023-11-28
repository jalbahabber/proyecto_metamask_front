import React, { useState, useEffect } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        const timer =
            seconds >0 && setInterval(() => setSeconds(seconds - 1), 1000);
        return () => clearInterval(timer);
    }, [seconds]);

    return (
        <div className='timer'>
            {seconds}
        </div>
    );
}

export default Timer;