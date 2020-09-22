import axios from '../axios';

interface ITimeRecord {
  startTime: string;
  endTime: string;
  label: string;
  category: string;
  id: number;
}

export const fetchTimeRecord = async (
  page: number,
  perPage: number,
  userId: number
): Promise<{ data: ITimeRecord[] }> =>
  axios.get(`/users/${userId}/time_records`, {
    params: { page, per_page: perPage },
  });

export const createTimeRecord = async (
  startTime: string,
  endTime: string,
  userId: number,
  label?: string,
  category?: string
): Promise<void | Error> =>
  axios.post(`/users/${userId}/time_records`, {
    time_record: { start_time: startTime, end_time: endTime, label, category },
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
  axios.put(`/users/${userId}/time_records/${timeRecordId}`, {
    time_record: {
      start_time: data.startTime,
      end_time: data.endTime,
      label: data.label,
      category: data.category,
    },
  });

export const deleteTimeRecord = async (
  userId: number,
  timeRecordId: number
): Promise<void | Error> => axios.delete(`/users/${userId}/time_records/${timeRecordId}`);

export const fetchCategories = (userId: number): Promise<ITimeRecord> =>
  axios.get(`/users/${userId}/categories`);
