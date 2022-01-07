import React, { useState } from 'react';
import { IUser } from '../types/users';

interface Props {
  children: React.ReactNode;
}

interface ContextValue {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const UserContext = React.createContext({} as ContextValue);

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<IUser>({
    id: 0,
    email: '',
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
}
