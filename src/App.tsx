import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import UserContextProvider from './Contexts/UserContext';
import Routes from './Routes';

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Switch>
          <Routes />
        </Switch>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
