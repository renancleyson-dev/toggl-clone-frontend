import React from 'react';
import styled from 'styled-components';
import Timer from './Timer';
import TimerButton from './TimerButton';

const TrackerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// UI to control and inform about current time tracking
export default function Tracker() {
  return (
    <TrackerWrapper>
      <Timer />
      <TimerButton />
    </TrackerWrapper>
  );
}
