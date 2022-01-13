import { useCallback, useContext } from 'react';
import moment from 'moment';
import { TrackContext, ContextValue } from 'src/Contexts/TrackContext';
import { DateGroupContext } from 'src/Contexts/DateGroupsContext';
import { ADD_TYPE } from 'src/reducers/dateGroupsReducer/types';
import { ITimeRecord, ITrackingTimeRecord } from 'src/types/timeRecord';
import { createTimeRecord } from '../resources/timeRecords';
import useUser from './useUser';
import { useObjectSelector } from './shared/useObjectState';

const addAction = (value: ITimeRecord) => ({ type: ADD_TYPE, payload: value });

export default function useTracker() {
  const { user } = useUser();
  const { dispatchDateGroups } = useContext(DateGroupContext);
  const contextNullable = useContext(TrackContext);

  if (contextNullable === null) {
    throw new Error('useTracker must be within a TrackProvider');
  }

  const context = contextNullable as ContextValue;
  const { getTimeRecord, setTimeRecord, resetTimeRecord, setIsTracking } = context;

  const startTracking = useCallback(
    (_timeRecord?: ITrackingTimeRecord) => {
      setIsTracking(true);
      setTimeRecord({ ..._timeRecord, startTime: moment() });
    },
    [setIsTracking, setTimeRecord]
  );

  const stopTracking = useCallback(
    async (pass = false) => {
      if (!pass) {
        const payload = { ...getTimeRecord(), endTime: moment(), userId: user.id };
        const response = await createTimeRecord(payload);
        dispatchDateGroups && dispatchDateGroups(addAction(response.data));
      }

      resetTimeRecord();
      setIsTracking(false);
    },
    [resetTimeRecord, setIsTracking, dispatchDateGroups, getTimeRecord, user.id]
  );

  return { startTracking, stopTracking, ...context };
}

export function useTrackerSelector<T>(
  selector: (obj: ITrackingTimeRecord) => T,
  compareFunction?: (prevValue: T, value: T) => boolean
) {
  const contextNullable = useContext(TrackContext);

  if (contextNullable === null) {
    throw new Error('useTrackerSelector must be within a TrackProvider');
  }
  const { timeRecordControl } = contextNullable as ContextValue;

  return useObjectSelector(timeRecordControl, selector, compareFunction);
}
