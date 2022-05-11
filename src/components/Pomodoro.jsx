import React, {useState, useEffect} from 'react';
import Buttons from './Button';

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [run, setRun] = useState(false);
  const [startStop, setStartStop] = useState("Start");

  function btnStartStop() {
    setRun(!run);
    startStop === "Start" ? setStartStop("Stop") : setStartStop("Start");
  }

  useEffect(() => { 
    if (seconds === 0 && minutes === 0) {
      setStartStop("Start");
      setMinutes(25);
      return setRun(false);
    }

    if (run) {
      let interval = setInterval(() => {
      clearInterval(interval);

      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          // time out
          setSeconds(59);
          setRun(!run);
          setStartStop("Start");
        }
        } else {
        setSeconds(seconds - 1);
        }
      }, 1000);
    }
  }, [run, minutes, seconds]); 
     
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return (
    <div className='pomodoro'>
      <div className='timer'>
        {timerMinutes}:{timerSeconds}
      </div>
      <div className='buttons'>
        <Buttons 
          onClick={() => {
            btnStartStop();
          }}
          className='btnStartStop'>
          {" "}
          {startStop}{" "}
        </Buttons>
        <br/>
        <Buttons
          onClick={()=> {
            setMinutes(25);
            setSeconds(0);
          }}
          className='controls'>
            Reset
          </Buttons>
        <Buttons
          disabled={run}
          onClick={() => {
            setMinutes(minutes + 1);
          }}
          className="controls">
          {" "}+{" "}
        </Buttons>
        <Buttons
          disabled={run}
          onClick={() => {
            minutes > 0 ? setMinutes(minutes - 1) : setMinutes(0);
          }}
          className='controls'>
            {" "}-{" "}
          </Buttons>
      </div>
      
    </div>
  );
};

export default Pomodoro;