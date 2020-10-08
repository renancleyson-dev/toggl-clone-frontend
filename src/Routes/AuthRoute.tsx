import React from 'react';
import { Route } from 'react-router-dom';
import { Wrapper, FormBoxWrapper } from '../Auth/Styles';
import Login from '../Auth/Login';
import Register from '../Auth/Register';

export default function AuthRoute() {
  return (
    <Wrapper>
      <FormBoxWrapper>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </FormBoxWrapper>
    </Wrapper>
  );
}
