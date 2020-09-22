import React, { useContext, useEffect } from 'react';
import UserProvider, { UserContext } from '../Contexts/UserContext';

const mockedUser = {
  id: 1,
  name: 'renan',
  email: 'renancleyson.f@gmail.com',
  fullName: 'Renan Cleyson',
};

interface Props {
  user: { id: number; name: string; email: string; fullName: string };
  children: React.ReactNode;
}

const SetMockUser = ({ user, children }: Props) => {
  const { setUser } = useContext(UserContext);
  useEffect(() => setUser(user), [setUser, user]);
  return <>{children}</>;
};

const MockedUserContext = ({ user, children }: Props) => (
  <UserProvider>
    <SetMockUser user={user}>{children}</SetMockUser>
  </UserProvider>
);
MockedUserContext.defaultProps = {
  user: mockedUser,
};

export default MockedUserContext;
