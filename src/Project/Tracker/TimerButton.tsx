import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosPlayCircle } from 'react-icons/io';
import { RiStopCircleFill } from 'react-icons/ri';
import moment from 'moment';
import { UserContext } from 'src/Contexts/UserContext';
import { TrackContext } from 'src/Contexts/TrackContext';
import { createTimeRecord } from 'src/resources/timeRecords';

const Button = styled.button`
  padding: 0;
  display: flex;
  align-items: center;
  appearance: none;
  background-color: transparent;
  border: none;
  font-size: 45px;

  &:focus {
    outline: none;
  }
`;

// UI to manage the start time, end time and the post request of the time record
export default function TimerButton() {
  const { user } = useContext(UserContext);
  const { startTime, setStartTime, isTracking, setIsTracking } = useContext(TrackContext);

  useEffect(() => {
    if (isTracking && !startTime) {
      setStartTime(moment());
    } else if (!isTracking) {
      if (startTime && user?.id) {
        const endTime = moment();
        createTimeRecord(startTime.format(), endTime.format(), user.id);
      }

      setStartTime(undefined);
    }
  }, [isTracking, user, startTime, setStartTime]);

  return (
    <Button
      type="button"
      data-testid="timer-button"
      onClick={() => setIsTracking((prevState: boolean) => !prevState)}
    >
      {isTracking ? <RiStopCircleFill /> : <IoIosPlayCircle />}
    </Button>
  );
}
