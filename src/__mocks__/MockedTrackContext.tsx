import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import TrackProvider, { TrackContext } from '../Contexts/TrackContext';
import { ITag } from '../types/tags';

interface Props {
  startTime?: moment.Moment;
  tags: ITag[];
  isTracking: boolean;
  children: React.ReactNode;
}

export const SetMockTrack = ({ tags, isTracking, startTime, children }: Props) => {
  const { setStartTime, setIsTracking, setTags } = useContext(TrackContext);
  useEffect(() => {
    setStartTime(startTime);
    setIsTracking(isTracking);
    setTags(tags);
  }, [setStartTime, startTime, setIsTracking, isTracking, tags, setTags]);
  return <>{children}</>;
};
SetMockTrack.defaultProps = {
  isTracking: false,
};

const MockedTrackContext = ({ isTracking, startTime, tags, children }: Props) => (
  <TrackProvider>
    <SetMockTrack isTracking={isTracking} startTime={startTime} tags={tags}>
      {children}
    </SetMockTrack>
  </TrackProvider>
);
MockedTrackContext.defaultProps = {
  isTracking: false,
};

export default MockedTrackContext;
