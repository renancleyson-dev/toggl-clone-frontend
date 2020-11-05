import { useContext, useEffect, useCallback } from 'react';
import moment from 'moment';
import { TrackContext } from 'src/Contexts/TrackContext';
import { UserContext } from 'src/Contexts/UserContext';
import { createTimeRecord } from '../resources/timeRecords';

export default function useTracker() {
  const { user } = useContext(UserContext);
  const {
    actualTimeRecord,
    setActualTimeRecord,
    isTracking,
    setIsTracking,
    ...contextValue
  } = useContext(TrackContext);

  const { startTime } = actualTimeRecord;
  const handleStopTracking = useCallback(() => {
    const endTime = moment();
    createTimeRecord({ ...actualTimeRecord, endTime });
    setActualTimeRecord({ userId: user.id });
  }, [actualTimeRecord, setActualTimeRecord, user]);

  const handleSetIsTracking = (state: boolean | ((prevState: boolean) => any)) => {
    setIsTracking((prevState) => {
      if (typeof state === 'boolean') {
        if (prevState && state) {
          handleStopTracking();
          setActualTimeRecord((prevState) => ({ ...prevState, startTime: moment() }));
        }
        return state;
      } else {
        return state(prevState);
      }
    });
  };

  useEffect(() => {
    setActualTimeRecord((prevState) => ({ ...prevState, userId: user.id }));
  }, [user, setActualTimeRecord]);

  useEffect(() => {
    if (isTracking && !startTime) {
      setActualTimeRecord((prevState) => ({ ...prevState, startTime: moment() }));
    } else if (!isTracking && startTime && user.id) {
      handleStopTracking();
    }
  }, [isTracking, startTime, setActualTimeRecord, handleStopTracking, user]);

  return {
    startTime,
    actualTimeRecord,
    setActualTimeRecord,
    isTracking,
    setIsTracking: handleSetIsTracking,
    ...contextValue,
  };
}
