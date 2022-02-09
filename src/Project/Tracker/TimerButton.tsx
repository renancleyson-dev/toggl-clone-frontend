import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosPlayCircle } from 'react-icons/io';
import { RiStopCircleFill } from 'react-icons/ri';
import { buttonResets, colors } from 'src/styles';
import useTracker from 'src/hooks/useTracker';

// UI to manage the start time, end time and the post request of the time record
export default function TimerButton() {
  const [isSubmitting, setSubmitting] = useState(false);
  const { isTracking, startTracking, stopTracking } = useTracker();

  const handleClick = async () => {
    if (isTracking) {
      setSubmitting(true);
      await stopTracking();
      setSubmitting(false);
    } else {
      startTracking();
    }
  };

  return (
    <Button
      aria-label={isTracking ? 'stop tracking' : 'start tracking'}
      type="button"
      isTracking={isTracking}
      onClick={handleClick}
      disabled={isSubmitting}
    >
      {isTracking ? <RiStopCircleFill /> : <IoIosPlayCircle />}
    </Button>
  );
}

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
