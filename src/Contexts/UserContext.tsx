import React, { useState } from 'react';
import { IUser } from '../types/users';

interface Props {
  children: React.ReactNode;
}

export interface ContextValue {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = React.createContext<ContextValue | null>(null);

export default function UserProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser>({
    id: 0,
    email: '',
  });

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
}
