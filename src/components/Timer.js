import React, { useState, useEffect } from "react";

function Timer(prop) {
  const { active, partidaPerdida, winner } = prop;

  const [seconds, setSeconds] = useState("000");
  useEffect(() => {
    let interval;

    if (!active && !partidaPerdida) {
      setSeconds("000");
    }

    if (active && !winner) {
      interval = setInterval(() => {
        let segundos = (parseInt(seconds) + 1).toString()
        setSeconds((seconds) => seconds.slice(0,-segundos.length) + segundos)
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, active, partidaPerdida]);
  return seconds;
}

export default Timer;
