import { useState, useEffect } from "react";

export default function Counter() {
  useEffect(() => {
    // Function to be called every interval
    const tick = () => {
      console.log("ee");
    };
    // Set up the interval
    const interval = setInterval(tick, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs once
}
