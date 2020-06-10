import axios from 'axios';

interface ITimeRecord {
  startTime: string;
  endTime: string;
  timeRecordId: string;
}

export const fetchTimeRecord = (
  page: number,
  perPage: number,
  userId: string
): Promise<ITimeRecord> => {
  return axios
    .get(`users/${userId}/time_records`, {
      params: { page, per_page: perPage },
    })
    .then((response) => response.data)
    .catch((error) => error);
};

export const createTimeRecord = (
  startTime: string,
  endTime: string,
  userId: string
): Promise<void | Error> => {
  return axios
    .post(`users/${userId}/time_records`, {
      params: { start_time: startTime, end_time: endTime },
    })
    .then(() => {})
    .catch((error) => error);
};

export const updateTimeRecord = (
  startTime: string,
  endTime: string,
  userId: string,
  timeRecordId: string
): Promise<void | Error> => {
  return axios
    .put(`users/${userId}/time_records/${timeRecordId}`, {
      params: { start_time: startTime, end_time: endTime },
    })
    .then(() => {})
    .catch((error) => error);
};

export const deleteTimeRecord = (userId: string, timeRecordId: string): Promise<void | Error> => {
  return axios
    .delete(`users/${userId}/time_records/${timeRecordId}`)
    .then(() => {})
    .catch((error) => error);
};
