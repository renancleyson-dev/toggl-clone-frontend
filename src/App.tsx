import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import UserContextProvider from './Contexts/UserContext';
import Routes from './Routes';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Switch>
          <Routes />
        </Switch>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
