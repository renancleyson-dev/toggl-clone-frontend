import React, { useContext } from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import { requiredField } from '../helpers/validations';
import { createUser } from '../resources/users';
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

interface IForm {
  username: string;
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const initialValues = {
  username: '',
  fullName: '',
  termsAndPolicy: false,
  email: '',
  password: '',
  passwordConfirmation: '',
};

interface IErrors {
  [key: string]: string;
}

const validate = (fields: IForm) => {
  const errors = {} as IErrors;

  requiredField(fields.username, 'username', errors);
  requiredField(fields.fullName, 'fullName', errors);
  requiredField(fields.email, 'email', errors);
  requiredField(fields.password, 'password', errors);

  if (fields.password !== fields.passwordConfirmation) {
    errors.passwordConfirmation = "passwords don't match";
  }

  return errors;
};

const RegisterForm = () => {
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (
    userParams: IForm,
    { setSubmitting }: { setSubmitting: (boolState: boolean) => void }
  ) => {
    const userData = await createUser(userParams);
    setUser(userData);
    setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <Label htmlFor="email">Email</Label>
            <LoginTextInput id="email" name="email" placeholder="Email" />
          </FormRow>
          <FormRow>
            <Label htmlFor="password">Password</Label>
            <LoginTextInput
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
          </FormRow>
          <SubmitButton type="submit" disabled={isSubmitting}>
            Submit
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default function Register() {
  return (
    <FormBoxWrapper>
      <FormBox>
        <RegisterForm />
      </FormBox>
      <BottomSection>
        <BottomText>Have an account already?</BottomText>
        <Link to="/login">
          <Button type="button">Login</Button>
        </Link>
      </BottomSection>
    </FormBoxWrapper>
  );
}
