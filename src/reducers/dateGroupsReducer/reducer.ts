import moment from 'moment';
import { IDateGroup, ITimeRecord } from 'src/types/timeRecord';
import { FETCH_TYPE, EDIT_TYPE, ADD_TYPE, DELETE_TYPE } from './types';

export type Action = {
  type: string;
  payload: IDateGroup[] | ITimeRecord;
};

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

const dateGroupsReducer = (state: IDateGroup[], action: Action) => {
  switch (action.type) {
    case FETCH_TYPE:
      const dateGroups = action.payload as IDateGroup[];
      return dateGroups.reduce(fetchDateGroupsReducer, state);
    case EDIT_TYPE:
      const editedTimeRecord = action.payload as ITimeRecord;
      const startTimeMoment = moment(editedTimeRecord.startTime).format();
      const newState = state.map((dateGroup) => {
        if (moment(dateGroup.timeRecords[0].startTime).isSame(startTimeMoment, 'date')) {
          const newTimeRecords = dateGroup.timeRecords.map((actualTimeRecord) => {
            if (actualTimeRecord.id === editedTimeRecord.id) {
              return editedTimeRecord;
            }

            return actualTimeRecord;
          });

          return { date: dateGroup.date, timeRecords: newTimeRecords };
        }

        return dateGroup;
      });
      return newState;
    case ADD_TYPE:
      const addedTimeRecord = action.payload as ITimeRecord;
      const momentStartTime = moment(addedTimeRecord.startTime);
      if (
        state.length &&
        moment(state[0].timeRecords[0].startTime).isSame(momentStartTime, 'date')
      ) {
        const newTodayGroup = {
          ...state[0],
          timeRecords: [addedTimeRecord, ...state[0].timeRecords],
        };
        return [newTodayGroup, ...state.slice(1)];
      }
      return [{ date: 'Today', timeRecords: [addedTimeRecord] }, ...state];
    case DELETE_TYPE:
      const deletedTimeRecord = action.payload as ITimeRecord;
      return state.map(({ date, timeRecords }) => {
        const newTimeRecords = timeRecords.filter(
          ({ id }) => id !== deletedTimeRecord.id
        );
        return { date, timeRecords: newTimeRecords };
      });
    default:
      return state;
  }
};

export default dateGroupsReducer;
