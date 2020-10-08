import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import NoPage from './Components/NoPage';
import PrivateRoute from './Components/PrivateRoute';
import TrackerRoute from './Routes/TrackerRoute';
import AuthRoute from './Routes/AuthRoute';
import { handleUnauthorizedResponse } from './axios';

export default function Routes() {
  const history = useHistory();

  handleUnauthorizedResponse(history);
  return (
    <>
      <AuthRoute />
      <PrivateRoute exact path="/" component={TrackerRoute} />
      <Route path="/" component={NoPage} />
    </>
  );
}
