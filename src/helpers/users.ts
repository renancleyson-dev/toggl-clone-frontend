import axios from 'axios';

interface IUser {
  id: number;
  name: string;
  email: string;
}

export const fetchUser = (userId: number): Promise<IUser> => {
  return axios
    .get(`users/${userId}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export const updateUser = (userId: number): Promise<void | Error> => {
  return axios
    .put(`users/${userId}`)
    .then(() => {})
    .catch((error) => error);
};

export const deleteUser = (userId: number): Promise<void | Error> => {
  return axios
    .delete(`users/${userId}`)
    .then(() => {})
    .catch((error) => error);
};
