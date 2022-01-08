import { useContext } from 'react';
import moment from 'moment';
import { TrackContext } from 'src/Contexts/TrackContext';
import { DateGroupContext } from 'src/Contexts/DateGroupsContext';
import { ADD_TYPE } from 'src/reducers/dateGroupsReducer/types';
import { ITimeRecord, ITrackingTimeRecord } from 'src/types/timeRecord';
import { createTimeRecord } from '../resources/timeRecords';
import useUser from './useUser';

const addAction = (value: ITimeRecord) => ({ type: ADD_TYPE, payload: value });

export default function useTracker() {
  const { user } = useUser();
  const { dispatchDateGroups } = useContext(DateGroupContext);
  const {
    actualTimeRecord,
    setActualTimeRecord,
    isTracking,
    setIsTracking,
    ...contextValue
  } = useContext(TrackContext);

  const { startTime } = actualTimeRecord;
  const startTracking = (timeRecord?: ITrackingTimeRecord) => {
    setIsTracking(true);
    setActualTimeRecord((prevState) => ({
      ...prevState,
      ...timeRecord,
      startTime: moment(),
    }));
  };
  const stopTracking = () => {
    const endTime = moment();
    createTimeRecord({ ...actualTimeRecord, endTime }).then((response) => {
      dispatchDateGroups && dispatchDateGroups(addAction(response.data));
      setActualTimeRecord({ userId: user.id, label: '' });
      setIsTracking(false);
    });
  };

  return {
    startTime,
    actualTimeRecord,
    setActualTimeRecord,
    isTracking,
    setIsTracking,
    startTracking,
    stopTracking,
    ...contextValue,
  };
}
