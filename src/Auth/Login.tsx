import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import useUser from 'src/hooks/useUser';
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
  const { login } = useUser();

  const handleSubmit = async (
    loginParams: IForm,
    {
      setFieldError,
      setSubmitting,
    }: {
      setFieldError: (field: string, errorMsg: string) => void;
      setSubmitting: (boolState: boolean) => void;
    }
  ) => {
    try {
      await login(loginParams);
    } catch (error) {
      const data = error.response?.data;
      if (!data) {
        console.warn(error.message);
      } else if (data.message) {
        setFieldError('password', data.message);
      } else {
        const messages: { [key: string]: string } = data;
        Object.entries(messages).forEach((value) => {
          const [field, fieldError] = value;
          setFieldError(field, fieldError);
        });
      }
    } finally {
      setSubmitting(false);
    }
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
                {isSubmitting ? 'Submitting...' : 'Submit'}
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
