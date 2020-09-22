import axios from '../axios';

interface ISession {
  user: {
    id: number;
    fullName: string;
    email: string;
  };
  authenticityToken: string;
}

export const login = (loginParams: {
  username: string;
  password: string;
}): Promise<ISession> =>
  axios.post('/sessions', loginParams).then((response) => response.data);

export const logout = (sessionId: number): Promise<{}> =>
  axios.delete(`/sessions/${sessionId}`).then((response) => response.data);
