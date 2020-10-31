import { useContext, useEffect, useCallback } from 'react';
import moment from 'moment';
import { TrackContext } from 'src/Contexts/TrackContext';
import { UserContext } from 'src/Contexts/UserContext';
import { createTimeRecord } from '../resources/timeRecords';

export default function useTracker() {
  const { user } = useContext(UserContext);
  const { startTime, setStartTime, isTracking, setIsTracking } = useContext(TrackContext);
  const handleStopTracking = useCallback(() => {
    if (startTime && user.id) {
      const endTime = moment();
      return createTimeRecord(startTime.format(), endTime.format(), user.id);
    }

    setStartTime(undefined);
  }, [setStartTime, startTime, user]);

  const handleSetIsTracking = (state: boolean | ((prevState: boolean) => any)) => {
    setIsTracking((prevState) => {
      if (typeof state === 'boolean') {
        if (prevState && state) {
          handleStopTracking();
          setStartTime(moment());
        }
        return state;
      } else {
        return state(prevState);
      }
    });
  };

  useEffect(() => {
    if (isTracking && !startTime) {
      setStartTime(moment());
    } else if (!isTracking) {
      handleStopTracking();
    }
  }, [isTracking, startTime, setStartTime, handleStopTracking]);

  return { startTime, isTracking, setIsTracking: handleSetIsTracking };
}
