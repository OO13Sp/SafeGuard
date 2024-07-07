import React, { useState, useEffect } from "react";
import './TopSection.scss';
import Picture from './picture.jpg';

const TopSection = () => {
  // Mock data for demonstration
  const [daysLeft, setDaysLeft] = useState(7);
  const [hoursLeft, setHoursLeft] = useState(12);
  const [minutesLeft, setMinutesLeft] = useState(30);
  const [secondsLeft, setSecondsLeft] = useState(45);
  const username = "John Doe";
  const profilePicture = "/client/src/assets/logo.svg";
  const numberOfPasswords = 25; // Example number of passwords saved
  
  // Update the countdown timer every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Decrease the seconds left by 1
      setSecondsLeft(prevSeconds => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          // If seconds reach zero, reset seconds to 59 and decrease minutes
          setMinutesLeft(prevMinutes => {
            if (prevMinutes > 0) {
              return prevMinutes - 1;
            } else {
              // If minutes reach zero, reset minutes to 59 and decrease hours
              setHoursLeft(prevHours => {
                if (prevHours > 0) {
                  return prevHours - 1;
                } else {
                  // If hours reach zero, reset hours to 23 and decrease days
                  setDaysLeft(prevDays => {
                    if (prevDays > 0) {
                      return prevDays - 1;
                    } else {
                      // If days reach zero, stop the timer
                      clearInterval(intervalId);
                      return 0;
                    }
                  });
                  return 23; // Reset hours to 23
                }
              });
              return 59; // Reset minutes to 59
            }
          });
          return 59; // Reset seconds to 59
        }
      });
    }, 1000); // Run every 1000ms (1 second)

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Format the countdown timer
  const formatTimer = () => {
    return `${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
  };

  return (
    <div className="TopContainer">
    <div className="topRowContainer">
        <div className="welcomeContainer">
            <span>Welcome back, {username}</span>
        </div>
        <div className="profileContainer">
            <img src={Picture} alt="Profile" />
        </div>
    </div>
    <div className="bottomRowContainer">
        <div className="passwordsContainer">
            <span>Congratulations! You have saved {numberOfPasswords} passwords on Safeguard.</span>
        </div>
        <div className="timerContainer">
            <span>{formatTimer()} left until subscription ends</span>
        </div>
    </div>
</div>
  );
  
};

export default TopSection;
