import React, { PropsWithChildren, useMemo, useState } from 'react';
import { createUser, login as loginAPI } from 'src/resources/users';
import { IUser } from '../types/users';
import { fetchUser } from '../resources/users';
import { JWT_KEY } from '../helpers/constants';
import { setJsonWebToken } from '../axios';
import { useHistory } from 'react-router-dom';

type LoginParams = { email: string; password: string };
type RegisterParams = {
  email: string;
  password: string;
  country: string;
};

export interface ContextValue {
  user: IUser;
  isLoading: boolean;
  fetch: () => void;
  login: (params: LoginParams) => void;
  register: (params: RegisterParams) => void;
}

export const UserContext = React.createContext<ContextValue | null>(null);

export default function UserProvider({ children }: PropsWithChildren<{}>) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser>({
    id: 0,
    email: '',
  });

  const context = useMemo(() => {
    const login = async (params: LoginParams) => {
      const {
        data: { authToken, ...sessionResponse },
      } = await loginAPI(params);

      setJsonWebToken(authToken);
      setUser(sessionResponse);
      localStorage.setItem(JWT_KEY, authToken);

      history.push('/');
    };

    const register = async (params: RegisterParams) => {
      const { password } = params;

      const {
        data: { email },
      } = await createUser(params);
      await login({ email, password });
    };

    const fetch = async (isMount = true) => {
      const jsonWebToken = localStorage.getItem(JWT_KEY);

      if (!jsonWebToken) {
        history.push('/login');

        return;
      }

      setJsonWebToken(jsonWebToken);
      try {
        const { data } = await fetchUser();
        setUser(data);
      } catch (error) {
        console.warn(error);
      } finally {
        setIsLoading(false);
      }
    };
    return { user, isLoading, fetch, login, register };
  }, [history, user, isLoading]);

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}
