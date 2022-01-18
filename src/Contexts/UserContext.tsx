import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { createUser, login as loginAPI } from 'src/resources/users';
import { IUser } from '../types/users';
import { fetchUser } from '../resources/users';
import { USER_KEY, JWT_KEY } from '../helpers/constants';
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
  fetch: (isMount?: boolean) => void;
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

  const login = useCallback(async (params: LoginParams) => {
    const {
      data: { authToken, ...sessionResponse },
    } = await loginAPI(params);

    setJsonWebToken(authToken);
    setUser(sessionResponse);
    localStorage.setItem(JWT_KEY, `${authToken}`);
    localStorage.setItem(USER_KEY, `${sessionResponse.id}`);
  }, []);

  const register = useCallback(async (params: RegisterParams) => {
    const { data } = await createUser(params);
    setUser(data);
  }, []);

  const fetch = useCallback(
    async (isMount = true) => {
      const userId = localStorage.getItem(USER_KEY);
      const jsonWebToken = localStorage.getItem(JWT_KEY);

      if (!userId || !jsonWebToken) {
        history.push('/login');

        return;
      }

      setJsonWebToken(jsonWebToken);
      try {
        const { data } = await fetchUser(parseInt(userId, 10));
        if (!isMount) {
          return;
        }
        setUser(data);
      } catch (error) {
        console.warn(error);
      } finally {
        if (isMount) {
          setIsLoading(false);
        }
      }
    },
    [history]
  );

  const context = useMemo(() => ({ user, isLoading, fetch, login, register }), [
    user,
    isLoading,
    fetch,
    login,
    register,
  ]);

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}
