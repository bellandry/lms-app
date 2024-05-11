'use client'

import React, { useEffect, useState } from 'react'

interface TimeDisplayProps {
  initialTime: Date;
}

const DisplayHour = ({ initialTime }: TimeDisplayProps) => {
  const [currentTime, setCurrentTime] = useState(initialTime);

  const updateTime = () => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    updateTime()

    const timerID = setInterval(updateTime, 1000);

      return () => clearInterval(timerID);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  return (
      <div>
          <p>{formattedTime}</p>
      </div>
  );
}

export default DisplayHour