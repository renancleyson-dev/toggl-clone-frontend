import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { USER_KEY } from '../helpers/constants';
import { UserContext } from '../Contexts/UserContext';
import Loader from './Loader';

export default function PrivateRoute({ component: Component, ...rest }: RouteProps) {
  const userId = localStorage.getItem(USER_KEY);
  const { user } = useContext(UserContext);

  const isLoadingUser = () => userId && !user.id;

  if (!Component || isLoadingUser()) {
    return <Route {...rest} component={Loader} />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        userId && parseInt(userId, 10) === user.id ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
