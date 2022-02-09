import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import format from 'src/helpers/formatDuration';
import useTracker, { useTrackerSelector } from 'src/hooks/useTracker';

// UI to show duration of the tracking
export default function Timer() {
  const [duration, setDuration] = useState<moment.Duration>(moment.duration(0));
  const { isTracking } = useTracker();
  const startTime = useTrackerSelector(({ startTime }) => startTime);

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
      if (timer > -1) {
        clearInterval(timer);
      }
    }

    return () => clearInterval(timer);
  }, [isTracking, startTime]);

  return (
    <TimerWrapper data-testid="timer-content">
      <span>{format(duration)}</span>
    </TimerWrapper>
  );
}

const TimerWrapper = styled.div`
  min-width: 80px;
  margin-right: 10px;
  padding: 5px 7px;
  border-radius: 7px;
  font-weight: 600;
  text-align: center;

  &:hover {
    background-color: rgb(251, 229, 247);
  }
`;
