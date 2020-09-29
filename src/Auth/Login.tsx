import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { UserContext } from '../Contexts/UserContext';
import { requiredField } from '../helpers/validations';
import { USER_KEY, JWT_KEY } from '../helpers/constants';
import TextInput from '../Components/TextInput';
import { login } from '../resources/users';
import { setJsonWebToken } from '../axios';
import { SubmitButton } from './Styles';
import { Link } from 'react-router-dom';

interface IForm {
  username: string;
  password: string;
}

const initialValues = {
  username: '',
  password: '',
};

const validate = (fields: IForm) => {
  const errors = {};

  requiredField(fields.username, 'username', errors);
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
    <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <TextInput name="username" />
          <TextInput name="password" />
          <SubmitButton disabled={isSubmitting}>Sign in</SubmitButton>
          <Link to="/register">Register</Link>
        </form>
      )}
    </Formik>
  );
}
