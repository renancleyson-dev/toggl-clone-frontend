import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { UserContext } from '../Contexts/UserContext';
import { requiredField } from '../helpers/validations';
import { USER_KEY, JWT_KEY } from '../helpers/constants';
import { login } from '../resources/users';
import { setJsonWebToken } from '../axios';
import {
  FormBoxWrapper,
  FormBox,
  Form,
  Label,
  BottomText,
  LoginTextInput,
  SubmitButton,
  Button,
  FormRow,
  BottomSection,
} from './Styles';
import { Link } from 'react-router-dom';

interface IForm {
  email: string;
  password: string;
}

const initialValues = {
  email: '',
  password: '',
};

const validate = (fields: IForm) => {
  const errors = {};

  requiredField(fields.email, 'email', errors);
  requiredField(fields.password, 'password', errors);

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
    <FormBoxWrapper>
      <FormBox>
        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <Label htmlFor="email">Email</Label>
                <LoginTextInput id="email" name="email" placeholder="Email" />
              </FormRow>
              <FormRow>
                <Label htmlFor="password">Password</Label>
                <LoginTextInput id="password" name="password" placeholder="Password" />
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
    </FormBoxWrapper>
  );
}
