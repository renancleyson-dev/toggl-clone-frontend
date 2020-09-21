import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { START_BUTTON_ICON, STOP_BUTTON_ICON } from '../helpers/constants';
import { UserContext } from '../Contexts/UserContext';
import { TrackContext } from '../Contexts/TrackContext';
import { createTimeRecord } from '../resources/timeRecords';

const Button = styled.button``;
const Icon = styled.img``;

// UI to manage the start time, end time and the post request of the time record
export default function TimerButton() {
  const [icon, setIcon] = useState(START_BUTTON_ICON);
  const [fallback, setFallback] = useState('Start Tracking');
  const { user } = useContext(UserContext);
  const { startTime, setStartTime, isTracking, setIsTracking } = useContext(TrackContext);

  useEffect(() => {
    if (isTracking && !startTime) {
      setStartTime(moment());
      setIcon(STOP_BUTTON_ICON);
      setFallback('Stop Tracking');
    } else if (!isTracking) {
      if (startTime && user?.id) {
        const endTime = moment();
        createTimeRecord(startTime.format(), endTime.format(), user.id);
      }

      setStartTime(undefined);
      setIcon(START_BUTTON_ICON);
      setFallback('Start Tracking');
    }
  }, [isTracking, user, startTime, setStartTime]);

  return (
    <Button
      type="button"
      data-testid="timer-button"
      onClick={() => setIsTracking((prevState: boolean) => !prevState)}
    >
      <Icon src={icon} alt={fallback} data-testid="timer-icon" />
    </Button>
  );
}
