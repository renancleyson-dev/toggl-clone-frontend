import { useContext } from 'react';
import moment from 'moment';
import { TrackContext } from 'src/Contexts/TrackContext';
import { UserContext } from 'src/Contexts/UserContext';
import { DateGroupContext } from 'src/Contexts/DateGroupsContext';
import { ADD_TYPE } from 'src/reducers/dateGroupsReducer/types';
import { ITimeRecord } from 'src/types/timeRecord';
import { createTimeRecord } from '../resources/timeRecords';

const addAction = (value: ITimeRecord) => ({ type: ADD_TYPE, payload: value });

export default function useTracker() {
  const { user } = useContext(UserContext);
  const { dispatchDateGroups } = useContext(DateGroupContext);
  const {
    actualTimeRecord,
    setActualTimeRecord,
    isTracking,
    setIsTracking,
    ...contextValue
  } = useContext(TrackContext);

  const { startTime } = actualTimeRecord;
  const startTracking = () => {
    setIsTracking(true);
    setActualTimeRecord((prevState) => ({ ...prevState, startTime: moment() }));
  };
  const stopTracking = () => {
    const endTime = moment();
    setActualTimeRecord({ userId: user.id, label: '' });
    setIsTracking(false);
    createTimeRecord({ ...actualTimeRecord, endTime }).then((response) => {
      dispatchDateGroups && dispatchDateGroups(addAction(response.data));
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
