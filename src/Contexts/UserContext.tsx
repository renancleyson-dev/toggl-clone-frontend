import React, { useState, useEffect } from 'react';
import { setJsonWebToken } from '../axios';
import { USER_KEY, JWT_KEY } from '../helpers/constants';
import { fetchUser } from '../resources/users';
import { IUser } from '../types/users';

interface Props {
  children: React.ReactNode;
}

interface ContextValue {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const UserContext = React.createContext({} as ContextValue);

export default function Provider({ children }: Props) {
  const [user, setUser] = useState<IUser>({
    id: 0,
    email: '',
  });

  useEffect(() => {
    const userId = localStorage.getItem(USER_KEY);
    const jsonWebToken = localStorage.getItem(JWT_KEY);

    if (userId && jsonWebToken) {
      setJsonWebToken(jsonWebToken);
      fetchUser(parseInt(userId, 10)).then((data) => {
        setUser(data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
}
