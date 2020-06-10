import React, { useState, useEffect } from 'react';
import moment from 'moment';
import format from '../helpers/formatDuration';

interface Props {
  isTracking: boolean;
  startTime: moment.Moment | undefined;
}

// UI to show and control the time passed along the tracking
export default function Timer({ isTracking, startTime }: Props) {
  const [duration, setDuration] = useState<moment.Duration>(moment.duration(0));

  useEffect(() => {
    let timer: number;
    const handleOnTracking = () => {
      return setInterval(() => {
        setDuration(moment.duration(moment().diff(startTime)));
      }, 1000);
    };

    if (isTracking) {
      timer = handleOnTracking();
    } else {
      setDuration(moment.duration(0));
    }
    return () => clearInterval(timer);
  }, [isTracking, startTime]);

  return <span data-testid="timer-content">{format(duration)}</span>;
}
