import { CancelTokenSource } from 'axios';
import axios from '../axios';
import { IDateGroup, ITimeRecord } from '../types/timeRecord';

export const fetchTimeRecords = async (
  page: number,
  source?: CancelTokenSource,
  perPage = 3
): Promise<{ data: IDateGroup[] }> =>
  axios.get('/time_records', {
    params: { page, per_page: perPage },
    cancelToken: source?.token,
  });

export const createTimeRecord = async (
  startTime: string,
  endTime: string,
  userId: number,
  label?: string,
  category?: string
): Promise<void | Error> =>
  axios.post('/time_records', {
    time_record: { userId, startTime, endTime, label, category },
  });

export const updateTimeRecord = async (
  userId: number,
  timeRecordId: number,
  data: {
    startTime?: string;
    endTime?: string;
    label?: string;
    category?: string;
  }
): Promise<void | Error> =>
  axios.put(`/time_records/${timeRecordId}`, {
    time_record: {
      userId,
      startTime: data.startTime,
      endTime: data.endTime,
      label: data.label,
      category: data.category,
    },
  });

export const deleteTimeRecord = async (timeRecordId: number): Promise<void | Error> =>
  axios.delete(`/time_records/${timeRecordId}`);

export const fetchCategories = (): Promise<ITimeRecord> => axios.get('/categories');
