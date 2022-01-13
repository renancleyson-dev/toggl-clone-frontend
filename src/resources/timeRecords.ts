import { CancelTokenSource } from 'axios';
import axios from '../axios';
import { IDateGroup, ITimeRecordParams, ITimeRecord } from '../types/timeRecord';

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
  timeRecord: ITimeRecordParams
): Promise<{ data: ITimeRecord }> =>
  axios.post('/time_records', {
    ...timeRecord,
    startTime: timeRecord.startTime?.format(),
    endTime: timeRecord.endTime?.format(),
  });

export const updateTimeRecord = async (
  timeRecordId: number,
  data: Partial<ITimeRecordParams>
): Promise<{ data: ITimeRecord }> =>
  axios.put(`/time_records/${timeRecordId}`, {
    ...data,
    startTime: data.startTime?.format(),
    endTime: data.endTime?.format(),
  });

export const deleteTimeRecord = async (timeRecordId: number): Promise<void | Error> =>
  axios.delete(`/time_records/${timeRecordId}`);
