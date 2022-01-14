import { useContext } from 'react';
import { IContextValue, DateGroupContext } from 'src/Contexts/DateGroupsContext';
import { IDateGroup } from 'src/types/timeRecord';
import { useObjectSelector } from './shared/useObjectState';

export default function useDateGroups() {
  const contextNullable = useContext(DateGroupContext);

  if (contextNullable === null) {
    throw new Error('useDateGroups must be within a DateGroupsProvider');
  }

  const context = contextNullable as IContextValue;
  return context;
}

export function useDateGroupsSelector<T>(
  selector: (obj: { list: IDateGroup[] }) => T,
  compareFunction?: (prevValue: T, value: T) => boolean
) {
  const contextNullable = useContext(DateGroupContext);

  if (contextNullable === null) {
    throw new Error('useDateGroupsSelector must be within a DateGroupsProvider');
  }

  const { dateGroupsControl } = contextNullable as IContextValue;
  return useObjectSelector(dateGroupsControl, selector, compareFunction);
}
