import React from 'react';
import styled from 'styled-components';
import { IoIosPlayCircle } from 'react-icons/io';
import { RiStopCircleFill } from 'react-icons/ri';
import { buttonResets, colors } from 'src/styles';
import useTracker from 'src/hooks/useTracker';

const Button = styled.button`
  ${buttonResets}
  color: ${({ isTracking }: { isTracking: boolean }) =>
    isTracking ? 'rgb(255, 137, 122)' : colors.primary};
  padding: 0;
  display: flex;
  font-size: 45px;
  margin-right: 10px;

  &:hover {
    color: ${({ isTracking }: { isTracking: boolean }) =>
      isTracking ? 'rgb(255, 137, 122)' : colors.darkPrimary};
  }

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
      isTracking={isTracking}
      onClick={() => setIsTracking((prevState: boolean) => !prevState)}
    >
      {isTracking ? <RiStopCircleFill /> : <IoIosPlayCircle />}
    </Button>
  );
}
