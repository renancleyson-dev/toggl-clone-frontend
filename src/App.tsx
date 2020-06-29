import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './Contexts/UserContext';
import Routes from './Routes';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
