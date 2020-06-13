import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Timer from './Timer';
import TimerButton from './TimerButton';

const TrackerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// UI to control and inform about current time tracking
export default function Tracker() {
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<moment.Moment>();

  return (
    <TrackerWrapper>
      <Timer isTracking={isTracking} startTime={startTime} />
      <TimerButton
        isTracking={isTracking}
        setIsTracking={setIsTracking}
        setStartTime={setStartTime}
      />
    </TrackerWrapper>
  );
}
