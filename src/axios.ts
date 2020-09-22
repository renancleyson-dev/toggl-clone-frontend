import axios from 'axios';

const newConfigAxios = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setAuthenticityToken = (authenticityToken: string): void => {
  newConfigAxios.defaults.headers.common['X-CSRF-Token'] = authenticityToken;
};

export default newConfigAxios;
