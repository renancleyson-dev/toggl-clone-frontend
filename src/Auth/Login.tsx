import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { UserContext } from '../Contexts/UserContext';
import { USER_KEY, JWT_KEY } from '../helpers/constants';
import { login } from '../resources/users';
import { setJsonWebToken } from '../axios';
import {
  FormBox,
  Form,
  Label,
  BottomText,
  LoginTextInput,
  SubmitButton,
  Button,
  FormRow,
  BottomSection,
  AuthErrorMessage,
} from './Styles';
import Layout from './Layout';

interface IForm {
  email: string;
  password: string;
}

interface IErrors {
  [key: string]: string;
}

const initialValues = {
  email: '',
  password: '',
};

const validate = (fields: IForm) => {
  const errors: IErrors = {};

  Object.keys(fields)
    .filter((field) => !fields[field as keyof IForm])
    .forEach((field) => {
      errors[field] = 'Required';
    });

  return errors;
};

export default function Login() {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (
    loginParams: IForm,
    { setSubmitting }: { setSubmitting: (boolState: boolean) => void }
  ) => {
    const { authToken, ...sessionResponse } = await login(loginParams);
    setJsonWebToken(authToken);
    setUser(sessionResponse);
    localStorage.setItem(JWT_KEY, `${authToken}`);
    localStorage.setItem(USER_KEY, `${sessionResponse.id}`);

    history.push('/');
    setSubmitting(false);
  };

  return (
    <Layout>
      <FormBox>
        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <Label htmlFor="email">Email</Label>
                <LoginTextInput id="email" name="email" placeholder="Email" />
                <AuthErrorMessage>
                  <ErrorMessage name="email" />
                </AuthErrorMessage>
              </FormRow>
              <FormRow>
                <Label htmlFor="password">Password</Label>
                <LoginTextInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <AuthErrorMessage>
                  <ErrorMessage name="password" />
                </AuthErrorMessage>
              </FormRow>
              <SubmitButton type="submit" disabled={isSubmitting}>
                Submit
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </FormBox>
      <BottomSection>
        <BottomText>Don't have an account?</BottomText>
        <Link to="/register">
          <Button type="button">Sign up for free</Button>
        </Link>
      </BottomSection>
    </Layout>
  );
}
