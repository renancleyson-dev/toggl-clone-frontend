import React, { useState, useEffect } from 'react';
import { fetchUser } from '../resources/users';

interface Props {
  children: React.ReactNode;
}

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface ContextValue {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const UserContext = React.createContext({} as ContextValue);

export default function Provider({ children }: Props) {
  const [user, setUser] = useState<IUser>({
    id: 0,
    name: '',
    email: '',
  });

  useEffect(() => {
    const userId = document.cookie
      .split('; ')
      .find((row) => row.startsWith('user_id'))
      ?.split('=')[1];

    if (userId)
      fetchUser(parseInt(userId, 10)).then((data) => {
        setUser(data);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
}
