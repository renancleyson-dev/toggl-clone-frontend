import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import TrackProvider, { TrackContext } from '../Contexts/TrackContext';

interface Props {
  startTime?: moment.Moment;
  categories?: string[];
  isTracking: boolean;
  children: React.ReactNode;
}

export const SetMockTrack = ({ categories, isTracking, startTime, children }: Props) => {
  const { setStartTime, setIsTracking, setCategories } = useContext(TrackContext);
  useEffect(() => {
    setStartTime(startTime);
    setIsTracking(isTracking);
    setCategories(categories);
  }, [setStartTime, startTime, setIsTracking, isTracking, categories, setCategories]);
  return <>{children}</>;
};
SetMockTrack.defaultProps = {
  isTracking: false,
};

const MockedTrackContext = ({ isTracking, startTime, categories, children }: Props) => (
  <TrackProvider>
    <SetMockTrack isTracking={isTracking} startTime={startTime} categories={categories}>
      {children}
    </SetMockTrack>
  </TrackProvider>
);
MockedTrackContext.defaultProps = {
  isTracking: false,
};

export default MockedTrackContext;
