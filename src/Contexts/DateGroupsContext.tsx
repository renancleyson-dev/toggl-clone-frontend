import React, { useReducer } from 'react';
import { IDateGroup } from '../types/timeRecord';
import dateGroupsReducer, { Action } from '../reducers/dateGroupsReducer/reducer';

const initialDateGroupsState: IDateGroup[] = [];

interface IContextValue {
  dateGroups: IDateGroup[];
  dispatchDateGroups?: React.Dispatch<Action>;
}

export const DateGroupContext = React.createContext<IContextValue>({
  dateGroups: [],
});

export default function Provider({ children }: { children: React.ReactNode }) {
  const [dateGroups, dispatchDateGroups] = useReducer(
    dateGroupsReducer,
    initialDateGroupsState
  );

  return (
    <DateGroupContext.Provider value={{ dateGroups, dispatchDateGroups }}>
      {children}
    </DateGroupContext.Provider>
  );
}
