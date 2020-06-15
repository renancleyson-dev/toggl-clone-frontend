import axios from 'axios';

interface IUser {
  id: string;
  name: string;
  email: string;
}

export const fetchUser = (userId: string): Promise<IUser> => {
  return axios
    .get(`users/${userId}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export const updateUser = (userId: string): Promise<void | Error> => {
  return axios
    .put(`users/${userId}`)
    .then(() => {})
    .catch((error) => error);
};

export const deleteUser = (userId: string): Promise<void | Error> => {
  return axios
    .delete(`users/${userId}`)
    .then(() => {})
    .catch((error) => error);
};
