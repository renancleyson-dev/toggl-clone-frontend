import { CancelTokenSource } from 'axios';
import axios from '../axios';
import { IUser, IRegistration, ISession } from '../types/users';

// Authentication

export const login = (loginParams: {
  email: string;
  password: string;
}): Promise<{ data: ISession }> => axios.post('/login', loginParams);

// REST API

export const fetchUser = (
  userId: number,
  source?: CancelTokenSource
): Promise<{ data: IUser }> =>
  axios.get(`users/${userId}`, { cancelToken: source?.token });

export const createUser = (userParams: IRegistration): Promise<{ data: IUser }> =>
  axios.post('users', { user: userParams });

export const updateUser = (userId: number): Promise<void | Error> =>
  axios.put(`users/${userId}`);

export const deleteUser = (userId: number): Promise<void | Error> =>
  axios.delete(`users/${userId}`);
