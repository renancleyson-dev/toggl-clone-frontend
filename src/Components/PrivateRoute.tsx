import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useUser from 'src/hooks/useUser';
import Loader from './Loader';

export default function PrivateRoute({ component: Component, ...rest }: RouteProps) {
  const { user, isLoading, fetch } = useUser();

  useEffect(() => {
    let isMount = true;
    fetch(isMount);

    return () => {
      isMount = false;
    };
  }, [fetch]);

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
