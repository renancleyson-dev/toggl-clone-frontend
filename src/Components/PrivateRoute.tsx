import React, { useContext, useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { setJsonWebToken } from '../axios';
import { fetchUser } from '../resources/users';
import { USER_KEY, JWT_KEY } from '../helpers/constants';
import { UserContext } from '../Contexts/UserContext';
import Loader from './Loader';

const UserRoute = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const userId = localStorage.getItem(USER_KEY);
    const jsonWebToken = localStorage.getItem(JWT_KEY);

    if (userId && jsonWebToken) {
      setJsonWebToken(jsonWebToken);
      fetchUser(parseInt(userId, 10))
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.warn(error?.message);
        });
    }
  }, [setUser]);

  return <>{children}</>;
};

export default function PrivateRoute({ component: Component, ...rest }: RouteProps) {
  const userId = localStorage.getItem(USER_KEY);
  const { user } = useContext(UserContext);

  const isLoadingUser = () => userId && !user.id;

  if (!Component || isLoadingUser()) {
    const component = () => (
      <UserRoute>
        <Loader />
      </UserRoute>
    );
    return <Route {...rest} component={component} />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        userId && parseInt(userId, 10) === user.id ? (
          <UserRoute>
            <Component {...props} />
          </UserRoute>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
