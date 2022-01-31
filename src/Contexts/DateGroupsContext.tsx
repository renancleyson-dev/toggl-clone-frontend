import React, { PropsWithChildren, useMemo, useReducer } from 'react';
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { IDateGroup, ITimeRecord } from '../types/timeRecord';

type State = { list: IDateGroup[] };

export interface IContextValue {
  dateGroups: State;
  dispatchDateGroups: React.Dispatch<AnyAction>;
}

const initialState: State = { list: [] };

const findByDate = (date: string, groups: IDateGroup[]) =>
  groups.findIndex((dateGroups) => date === dateGroups.date);

const fetchDateGroupsReducer = (groups: IDateGroup[], actualDateGroup: IDateGroup) => {
  const { date, timeRecords } = actualDateGroup;

  const dateIndex = findByDate(date, groups);

  if (dateIndex === -1) {
    return [...groups, actualDateGroup];
  }

  return groups.map((dateGroup) => {
    if (dateGroup.date === date) {
      const newTimeRecords = [...dateGroup.timeRecords, ...timeRecords];
      return { date: dateGroup.date, timeRecords: newTimeRecords };
    }
    return dateGroup;
  });
};

const slice = createSlice({
  name: 'dateGroups',
  initialState,
  reducers: {
    fetch(state = initialState, { payload }: PayloadAction<IDateGroup[]>) {
      state.list = payload.reduce(fetchDateGroupsReducer, state.list);
    },
    add(state = initialState, { payload }: PayloadAction<ITimeRecord>) {
      const momentStartTime = moment(payload.startTime);
      const [dateGroup] = state.list;
      const [timeRecord] = dateGroup?.timeRecords || [];
      if (timeRecord && moment(timeRecord.startTime).isSame(momentStartTime, 'date')) {
        state.list[0] = {
          ...dateGroup,
          timeRecords: [payload, ...dateGroup.timeRecords],
        };
      } else {
        state.list.unshift({ date: 'Today', timeRecords: [payload] });
      }
    },
    edit(state = initialState, { payload }: PayloadAction<ITimeRecord>) {
      const startTimeMoment = moment(payload.startTime).format();

      const list = state.list.map((dateGroup) => {
        const [timeRecord] = dateGroup.timeRecords;
        if (moment(timeRecord.startTime).isSame(startTimeMoment, 'date')) {
          const newTimeRecords = dateGroup.timeRecords.map((actualTimeRecord) => {
            if (actualTimeRecord.id === payload.id) {
              return payload;
            }

            return actualTimeRecord;
          });

          return { date: dateGroup.date, timeRecords: newTimeRecords };
        }

        return dateGroup;
      });

      state.list = list;
    },
    delete(state = initialState, { payload }: PayloadAction<ITimeRecord>) {
      state.list = state.list.map(({ date, timeRecords }) => {
        const newTimeRecords = timeRecords.filter(({ id }) => id !== payload.id);

        return { date, timeRecords: newTimeRecords };
      });
    },
  },
});

export const { actions: dateGroupActions } = slice;
export const DateGroupContext = React.createContext<IContextValue | null>(null);

export default function DateGroupsProvider({ children }: PropsWithChildren<{}>) {
  const [dateGroups, dispatchDateGroups] = useReducer(slice.reducer, initialState);

  const context = useMemo(() => {
    return { dateGroups, dispatchDateGroups };
  }, [dateGroups, dispatchDateGroups]);

  return (
    <DateGroupContext.Provider value={context}>{children}</DateGroupContext.Provider>
  );
}
