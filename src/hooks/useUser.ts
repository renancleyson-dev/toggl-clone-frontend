import { useContext } from 'react';
import { ContextValue, UserContext } from 'src/Contexts/UserContext';

export default function useUser() {
  const contextNullable = useContext(UserContext);

  if (contextNullable === null) {
    throw new Error('useUser must be within a UserProvider');
  }

  const context = contextNullable as ContextValue;
  return context;
}
