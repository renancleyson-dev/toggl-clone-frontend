import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import NoPage from './Components/NoPage';
import PrivateRoute from './Components/PrivateRoute';
import Project from './Project';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { handleUnauthorizedResponse } from './axios';

export default function Routes() {
  const history = useHistory();

  handleUnauthorizedResponse(history);
  return (
    <>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <PrivateRoute exact path="/" component={Project} />
      <Route path="/" component={NoPage} />
    </>
  );
}
