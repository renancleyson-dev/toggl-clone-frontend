import { CancelTokenSource } from 'axios';
import axios from '../axios';
import { IUser, IRegistration, ISession } from '../types/users';

// Authentication

export const login = (loginParams: {
  email: string;
  password: string;
}): Promise<ISession> =>
  axios.post('/login', loginParams).then((response) => response.data);

// REST API

export const fetchUser = (userId: number, source?: CancelTokenSource): Promise<IUser> =>
  axios
    .get(`users/${userId}`, { cancelToken: source?.token })
    .then((response) => response.data)
    .catch((error) => error);

export const createUser = (userParams: IRegistration): Promise<IUser> =>
  axios
    .post('users', { user: userParams })
    .then((response) => response.data)
    .catch((error) => error);

export const updateUser = (userId: number): Promise<void | Error> =>
  axios
    .put(`users/${userId}`)
    .then(() => {})
    .catch((error) => error);

export const deleteUser = (userId: number): Promise<void | Error> =>
  axios
    .delete(`users/${userId}`)
    .then(() => {})
    .catch((error) => error);
