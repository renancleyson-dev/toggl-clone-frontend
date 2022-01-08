import { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ContextValue, UserContext } from 'src/Contexts/UserContext';
import { setJsonWebToken } from '../axios';
import { fetchUser } from '../resources/users';
import { USER_KEY, JWT_KEY } from '../helpers/constants';
import { login } from '../resources/users';

export default function useUser() {
  const contextNullable = useContext(UserContext);
  const history = useHistory();

  if (contextNullable === null) {
    throw new Error('useUser must be within a UserProvider');
  }

  const context = contextNullable as ContextValue;
  const { setUser, setIsLoading } = context;

  const loginUser = useCallback(
    async (params: { email: string; password: string }) => {
      const {
        data: { authToken, ...sessionResponse },
      } = await login(params);

      setJsonWebToken(authToken);
      setUser(sessionResponse);
      localStorage.setItem(JWT_KEY, `${authToken}`);
      localStorage.setItem(USER_KEY, `${sessionResponse.id}`);
    },
    [setUser]
  );

  const fetch = useCallback(
    async (isMount: boolean) => {
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
    [setUser, setIsLoading, history]
  );

  return { ...context, fetch, login: loginUser };
}
