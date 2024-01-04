import React, { useState } from 'react';

function Timer({ minutes, seconds, updateTimerValues, isActive, startTimer, pauseTimer, timerWasActive, setTimerWasActive, setTotalTimeInSeconds, setRemainingTimeInSeconds}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newMinutes, setNewMinutes] = useState(minutes);
  const [newSeconds, setNewSeconds] = useState(seconds);

  // Clicking time
  const handleTimerClick = () => {
    if (!isEditing) {
      setNewMinutes(minutes);
      setNewSeconds(seconds);
    }
    if (isActive) {
      // If the timer is active, pause it and remember that it was active
      pauseTimer();
      setTimerWasActive(true);
    } else {
      setTimerWasActive(false);
    }
    setIsEditing(true);
  };

  // Changing input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'minutes') {
      setNewMinutes(value);
    } else if (name === 'seconds') {
      setNewSeconds(value);
    }
  };

  const handleInputBlur = () => {
    // Ensure that empty values are treated as 0
    const minutesValue = newMinutes === '' ? 0 : parseInt(newMinutes, 10);
    const secondsValue = newSeconds === '' ? 0 : parseInt(newSeconds, 10);
  
    setIsEditing(false);
  
    updateTimerValues(minutesValue, secondsValue);
  };

  return (
    <div className="timer" onClick={handleTimerClick}>
      {isEditing ? (
        <div>
          <input
            type="number"
            name="minutes"
            value={newMinutes}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 2); // Limit input to two characters
              e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
            }}
          />
          <span>:</span>
          <input
            type="number"
            name="seconds"
            value={newSeconds}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 2); // Limit input to two characters
              e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
            }}
          />
        </div>
      ) : (
        <div>
          <span>{minutes.toString().padStart(2, '0')}</span>
          <span>:</span>
          <span>{seconds.toString().padStart(2, '0')}</span>
        </div>
      )}
    </div>
  );
}

export default Timer;
