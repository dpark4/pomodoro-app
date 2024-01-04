// App.js
import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Controls from './Controls';
import SettingsPage from './SettingsPage';
import SettingsContext from './SettingsContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function App() {
  const [minutes, setMinutes] = useState(45);
  const [seconds, setSeconds] = useState(0);
  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(minutes * 60 + seconds);
  const [isActive, setIsActive] = useState(false);
  const [timerWasActive, setTimerWasActive] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(100); // Progress percentage state
  const [showSettings, setShowSettings] = useState(false); //Settings Stuff
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);
  const [breakIsActive, setBreakIsActive] = useState(false);

  useEffect(() => {
    let interval;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0 || minutes === '00' ) {
            clearInterval(interval);
            // setIsActive(false);
            if (breakIsActive) {
              setMinutes(workMinutes);
              setSeconds(0);
              // setTotalTimeInSeconds(workMinutes * 60);
              setProgressPercentage(100);
              setBreakIsActive(false);
            } else {
              setMinutes(breakMinutes);
              setSeconds(0);
              // setTotalTimeInSeconds(breakMinutes * 60);
              setProgressPercentage(100);
              setBreakIsActive(true);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }

      //Calculate Progress %
      const remainingTimeInSeconds = totalTimeInSeconds - ((minutes * 60 + seconds) - 1);
      // console.log(remainingTimeInSeconds)
      const newProgressPercentage = Math.floor(
        ((totalTimeInSeconds - remainingTimeInSeconds) / totalTimeInSeconds) * 100
      );
      setProgressPercentage(newProgressPercentage);
      }, 1000);
      

    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, totalTimeInSeconds, workMinutes, breakMinutes, breakIsActive]);

  // Helper Functions for Updating Timer Status

  const startTimer = () => {
    setIsActive(true);
  }

  const pauseTimer = () => {
    setIsActive(false);
  }

  const resetTimer = () => {
    // setIsActive(false);
    setMinutes(workMinutes);
    setSeconds(0);
    setTotalTimeInSeconds(workMinutes * 60);
    setProgressPercentage(100);
  };

  function updateTimerValues(newMinutes, newSeconds) {
    setMinutes(newMinutes);
    setSeconds(newSeconds);
    const minutesAsNumber = parseInt(newMinutes, 10);
    const secondsAsNumber = parseInt(newSeconds, 10);
    // const newTotalTimeInSeconds = newMinutes * 60 + newSeconds;
    setTotalTimeInSeconds(minutesAsNumber * 60 + secondsAsNumber);
  }
  
  return (
    <div className="app">
      <SettingsContext.Provider value={{
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? (
          <SettingsPage 
            setShowSettings={setShowSettings}
            resetTimer={resetTimer}  
          />
        ) : (

          <div className="home-page">
            <div className="progress-container">
              <CircularProgressbar
                value={progressPercentage}
                counterClockwise={breakIsActive}
                styles={buildStyles({
                  // Rotation of path and trail, in number of turns (0-1)
                  rotation: 0.25,
              
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: 'butt',
              
                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,
              
                  // Can specify path transition in more detail, or remove it entirely
                  // pathTransition: 'none',
              
                  // Colors
                  pathColor: breakIsActive ? `rgb(80, 200, 255)` : `rgba(255, 136, 136)`,
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e98c7',
                })}
              
              />
              <Timer
                minutes={minutes}
                seconds={seconds}
                updateTimerValues={updateTimerValues}
                isActive={isActive}
                startTimer={startTimer}
                pauseTimer={pauseTimer}
                timerWasActive={timerWasActive}
                setTimerWasActive={setTimerWasActive}
                setTotalTimeInSeconds={setTotalTimeInSeconds}
              />

            </div>
            <Controls
              startTimer={startTimer}
              pauseTimer={pauseTimer}
              resetTimer={resetTimer}
              setShowSettings={setShowSettings}
            />
          </div>

        )}
      </SettingsContext.Provider>

    </div>
  );
  
}

export default App;