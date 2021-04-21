import React from 'react';
import { useEffect, useState } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Controls } from './components/Controls';
import './App.scss';

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState('stopped');
  const [lastClick, setLastClick] = useState(0);
 
  useEffect(() => {
    const unsubscribe$ = new Subject();

    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === 'running') {
          setSeconds(val => val + 1000);
        }
      });

    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [status]);
 
  const start_stop = () => {
    if (status === 'running') {
      setStatus('stopped');
      setSeconds(0);
    } else {
      setStatus('running');
    }
  };
 
  const reset = () => {
    setSeconds(0);
    setStatus('running');
  };
  
  const wait = (e) => {
    if (lastClick > 0) {
      const diff = e.timeStamp - lastClick;

      if (diff < 300) {
        setStatus('waiting');
      }
    }

    setLastClick(e.timeStamp);    
  };
 
  return (
    <div className="container">
      <div className="card timer">
        <div className="timer__tabloid"> {new Date(seconds).toISOString().slice(11, 19)}</div>
       <Controls status ={status} start={start_stop} reset={reset} wait={wait}/>
      </div>
    </div>
  );
}
