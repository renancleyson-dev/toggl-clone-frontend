import axios from 'axios';
import { History } from 'history';

const config: any = {
  baseURL: 'https://toggl-clone-backend.herokuapp.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

if (process.env.NODE_ENV === 'test') {
  delete config.baseURL;
}

const newConfigAxios = axios.create(config);

export const setJsonWebToken = (token: string): void => {
  newConfigAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearJsonWebToken = () => {
  newConfigAxios.defaults.headers.common['Authorization'] = '';
};

export const handleUnauthorizedResponse = (history: History) => {
  newConfigAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        history.push('/login');
      } else if (error.isAxiosError && !error.response) {
        window.alert('An error occurred in the connection with the server');
      }

      return Promise.reject(error);
    }
  );
};

export default newConfigAxios;
