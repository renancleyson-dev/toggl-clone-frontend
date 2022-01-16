import { useContext } from 'react';
import { TrackContext, ContextValue } from 'src/Contexts/TrackContext';
import { ITrackingTimeRecord } from 'src/types/timeRecord';
import { useObjectSelector } from './shared/useObjectState';

export default function useTracker() {
  const contextNullable = useContext(TrackContext);

  if (contextNullable === null) {
    throw new Error('useTracker must be within a TrackProvider');
  }

  const context = contextNullable as ContextValue;
  return context;
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
