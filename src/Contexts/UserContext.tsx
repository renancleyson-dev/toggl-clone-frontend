import React, { useState, useEffect } from 'react';
import { fetchUser } from '../helpers/users';

interface Props {
  children: React.ReactNode;
}

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface ContextValue {
  user: IUser;
  setUser: Function;
}

export const UserContext = React.createContext({} as ContextValue);

export default function Provider({ children }: Props) {
  const [user, setUser] = useState<IUser>({
    id: '',
    name: '',
    email: '',
  });

  useEffect(() => {
    const userId = document.cookie
      .split('; ')
      .find((row) => row.startsWith('user_id'))
      ?.split('=')[1];

    if (userId) fetchUser(userId).then((data) => setUser(data));
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
