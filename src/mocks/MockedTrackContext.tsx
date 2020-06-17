import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import TrackProvider, { TrackContext } from '../Contexts/TrackContext';

interface Props {
  startTime?: moment.Moment;
  isTracking: boolean;
  children: React.ReactNode;
}

export const SetMockTrack = ({ isTracking, startTime, children }: Props) => {
  const { setStartTime, setIsTracking } = useContext(TrackContext);
  useEffect(() => {
    setStartTime(startTime);
    setIsTracking(isTracking);
  }, [setStartTime, startTime, setIsTracking, isTracking]);
  return <>{children}</>;
};
SetMockTrack.defaultProps = {
  isTracking: false,
};

const MockedTrackContext = ({ isTracking, startTime, children }: Props) => (
  <TrackProvider>
    <SetMockTrack isTracking={isTracking} startTime={startTime}>
      {children}
    </SetMockTrack>
  </TrackProvider>
);
MockedTrackContext.defaultProps = {
  isTracking: false,
};

export default MockedTrackContext;
