import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import format from '../helpers/formatDuration';
import { TrackContext } from '../Contexts/TrackContext';

// UI to show duration of the tracking
export default function Timer() {
  const [duration, setDuration] = useState<moment.Duration>(moment.duration(0));
  const { startTime, isTracking } = useContext(TrackContext);
  useEffect(() => {
    let timer = -1;
    const handleOnTracking = () => {
      return setInterval(() => {
        setDuration(moment.duration(moment().diff(startTime)));
      }, 1000);
    };

    if (isTracking) {
      timer = handleOnTracking();
    } else {
      setDuration(moment.duration(0));
      if (timer > -1) clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isTracking, startTime]);

  return <div data-testid="timer-content">{format(duration)}</div>;
}
