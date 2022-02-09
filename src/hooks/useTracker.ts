import { useContext } from 'react';
import { TrackContext } from 'src/Contexts/TrackContext';
import { ITrackingTimeRecord } from 'src/types/timeRecord';
import { useObjectSelector } from './shared/useObjectState';

export default function useTracker() {
  const context = useContext(TrackContext);

  if (context === null) {
    throw new Error('useTracker must be within a TrackProvider');
  }

  return context;
}

export function useTrackerSelector<T>(
  selector: (obj: ITrackingTimeRecord) => T,
  compareFunction?: (prevValue: T, value: T) => boolean
) {
  const context = useTracker();
  const { timeRecordControl } = context;

  return useObjectSelector(timeRecordControl, selector, compareFunction);
}
