import axios from '../axios';

interface IUser {
  id: number;
  fullName: string;
  email: string;
}

interface IRegistration {
  fullName: string;
  email: string;
  country: string;
  password: string;
  passwordConfirmation: string;
  username: string;
}

interface ISession extends IUser {
  authToken: string;
}

// Authentication

export const login = (loginParams: {
  email: string;
  password: string;
}): Promise<ISession> =>
  axios.post('/login', loginParams).then((response) => response.data);

// REST API

export const fetchUser = (userId: number): Promise<IUser> =>
  axios
    .get(`users/${userId}`)
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
