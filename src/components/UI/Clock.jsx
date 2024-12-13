import React, { useState, useEffect, useCallback, useMemo } from 'react';

const Clock = () => {
  // Memoize targetDate to ensure it's not recreated on every render
  const targetDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 12);
    return date;
  }, []); // This will only run once, when the component is mounted

  // Function to calculate time remaining wrapped in useCallback
  const calculateTimeLeft = useCallback(() => {
    const difference = targetDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  }, [targetDate]); // Now targetDate is stable

  // State to hold time left
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Update the time left every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear interval when the component unmounts
    return () => clearInterval(timer);
  }, [calculateTimeLeft]); // Now we only depend on the memoized function

  return (
    <div className="clock_wrapper d-flex align-items-center gap-3" style={{ color: '#FFFFFF' }}>
      <div className="text-center">
        <h1>{timeLeft.days}</h1>
        <p>Days</p>
      </div>
      <span>:</span>
      <div className="text-center">
        <h1>{timeLeft.hours}</h1>
        <p>Hours</p>
      </div>
      <span>:</span>
      <div className="text-center">
        <h1>{timeLeft.minutes}</h1>
        <p>Minutes</p>
      </div>
      <span>:</span>
      <div className="text-center">
        <h1>{timeLeft.seconds}</h1>
        <p>Seconds</p>
      </div>
    </div>
  );
};

export default Clock;
