import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { USER_KEY } from '../helpers/constants';

export default function PrivateRoute({ component: Component, ...rest }: RouteProps) {
  const userId = localStorage.getItem(USER_KEY);

  if (!Component) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) => (userId ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
}
