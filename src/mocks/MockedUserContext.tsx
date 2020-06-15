import React, { useContext, useEffect } from 'react';
import UserProvider, { UserContext } from '../Contexts/UserContext';

const SetMockUser = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useContext(UserContext);
  useEffect(() => setUser({ id: '1', name: '', email: '' }), [setUser]);
  return <>{children}</>;
};

const MockedUserContext = ({ children }: { children: React.ReactNode }) => (
  <UserProvider>
    <SetMockUser>{children}</SetMockUser>
  </UserProvider>
);

export default MockedUserContext;
