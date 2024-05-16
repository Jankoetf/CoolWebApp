import React, { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  const timeString = time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return <div className="timer">{timeString}</div>;
}

export default Clock;
