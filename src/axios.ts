import axios from 'axios';
import { History } from 'history';

const newConfigAxios = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setJsonWebToken = (token: string): void => {
  newConfigAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const handleUnauthorizedResponse = (history: History) => {
  newConfigAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        history.push('/login');
      }

      return Promise.reject(error);
    }
  );
};

export default newConfigAxios;