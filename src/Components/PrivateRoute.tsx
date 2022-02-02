import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useUser from 'src/hooks/useUser';
import Loader from './Loader';

export default function PrivateRoute({ component: Component, ...rest }: RouteProps) {
  const { user, isLoading, fetch } = useUser();

  useEffect(() => {
    if (user.id === 0) {
      fetch();
    }
  }, [fetch, user.id]);

  if (!Component || isLoading) {
    return <Route {...rest} component={Loader} />;
  }

  return (
    <Route
      {...rest}
      render={(props) => (user.id ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
}
