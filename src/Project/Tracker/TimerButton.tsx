import React from 'react';
import styled from 'styled-components';
import { IoIosPlayCircle } from 'react-icons/io';
import { RiStopCircleFill } from 'react-icons/ri';
import useTracker from 'src/hooks/useTracker';

const Button = styled.button`
  padding: 0;
  display: flex;
  align-items: center;
  appearance: none;
  background-color: transparent;
  border: none;
  font-size: 45px;
  margin-right: 15px;

  &:focus {
    outline: none;
  }
`;

// UI to manage the start time, end time and the post request of the time record
export default function TimerButton() {
  const { isTracking, setIsTracking } = useTracker();

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
