import React from 'react';
import { Route } from 'react-router-dom';
import { Wrapper, FormBoxWrapper } from '../Auth/Styles';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Header from '../Auth/Header';

export default function AuthRoute() {
  return (
    <Wrapper>
      <Header />
      <FormBoxWrapper>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </FormBoxWrapper>
    </Wrapper>
  );
}
