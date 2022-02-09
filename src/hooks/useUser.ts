import { useContext } from 'react';
import { UserContext } from 'src/Contexts/UserContext';

export default function useUser() {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error('useUser must be within a UserProvider');
  }

  return context;
}
