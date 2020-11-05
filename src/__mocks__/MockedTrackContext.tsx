import React, { useContext, useEffect } from 'react';
import TrackProvider, { TrackContext } from '../Contexts/TrackContext';
import { ITrackingTimeRecord } from '../types/timeRecord';

interface Props {
  timeRecord: ITrackingTimeRecord;
  isTracking: boolean;
  children: React.ReactNode;
}

export const SetMockTrack = ({ timeRecord, isTracking, children }: Props) => {
  const { setActualTimeRecord, setIsTracking } = useContext(TrackContext);
  useEffect(() => {
    setActualTimeRecord(timeRecord);
    setIsTracking(isTracking);
  }, [setActualTimeRecord, timeRecord, setIsTracking, isTracking]);
  return <>{children}</>;
};
SetMockTrack.defaultProps = {
  isTracking: false,
};

const MockedTrackContext = ({ isTracking, timeRecord, children }: Props) => (
  <TrackProvider>
    <SetMockTrack isTracking={isTracking} timeRecord={timeRecord}>
      {children}
    </SetMockTrack>
  </TrackProvider>
);
MockedTrackContext.defaultProps = {
  isTracking: false,
};

export default MockedTrackContext;
