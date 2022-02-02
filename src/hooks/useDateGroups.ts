import { useContext } from 'react';
import { DateGroupContext } from 'src/Contexts/DateGroupsContext';

export default function useDateGroups() {
  const context = useContext(DateGroupContext);

  if (context === null) {
    throw new Error('useDateGroups must be within a DateGroupsProvider');
  }

  return context;
}
