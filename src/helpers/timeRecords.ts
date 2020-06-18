import axios from 'axios';

interface ITimeRecord {
  startTime: string;
  endTime: string;
  label: string;
  category: string;
  timeRecordId: number;
}

export const fetchTimeRecord = (
  page: number,
  perPage: number,
  userId: number
): Promise<ITimeRecord> =>
  axios
    .get(`users/${userId}/time_records`, {
      params: { page, per_page: perPage },
    })
    .then((response) => response.data)
    .catch((error) => error);

export const createTimeRecord = (
  startTime: string,
  endTime: string,
  userId: number,
  label?: string,
  category?: string
): Promise<void | Error> =>
  axios
    .post(`users/${userId}/time_records`, {
      data: { start_time: startTime, end_time: endTime, label, category },
    })
    .then(() => {})
    .catch((error) => error);

export const updateTimeRecord = (
  userId: number,
  timeRecordId: number,
  data: {
    startTime?: string;
    endTime?: string;
    label?: string;
    category?: string;
  }
): Promise<void | Error> =>
  axios
    .put(`users/${userId}/time_records/${timeRecordId}`, {
      data: {
        start_time: data.startTime,
        end_time: data.endTime,
        label: data.label,
        category: data.category,
      },
    })
    .then(() => {})
    .catch((error) => error);

export const deleteTimeRecord = (
  userId: number,
  timeRecordId: number
): Promise<void | Error> =>
  axios
    .delete(`users/${userId}/time_records/${timeRecordId}`)
    .then(() => {})
    .catch((error) => error);
