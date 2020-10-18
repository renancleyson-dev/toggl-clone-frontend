import axios from '../axios';

interface ITimeRecord {
  startTime: string;
  endTime: string;
  label: string;
  category: string;
  id: number;
}

interface IGroupedTimeRecords {
  date: string;
  timeRecords: ITimeRecord[];
}

export const fetchTimeRecords = async (
  page: number,
  perPage = 3
): Promise<{ data: IGroupedTimeRecords[] }> =>
  axios.get('/time_records', {
    params: { page, per_page: perPage },
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
