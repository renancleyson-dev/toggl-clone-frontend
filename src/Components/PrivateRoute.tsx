import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { USER_KEY } from '../helpers/constants';
import { UserContext } from '../Contexts/UserContext';

export default function PrivateRoute({ component: Component, ...rest }: RouteProps) {
  const userId = localStorage.getItem(USER_KEY);
  const { user } = useContext(UserContext);

  if (!Component || !user.id || !userId) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        parseInt(userId, 10) === user.id ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}