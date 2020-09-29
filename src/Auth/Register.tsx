import React, { useContext } from 'react';
import { Formik } from 'formik';
import { UserContext } from '../Contexts/UserContext';
import TextInput from '../Components/TextInput';
import { requiredField } from '../helpers/validations';
import { createUser } from '../resources/users';
import { SubmitButton } from './Styles';

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

export default function Register() {
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
        <form onSubmit={handleSubmit}>
          <TextInput name="username" />
          <TextInput name="fullName" />
          <TextInput name="email" />
          <TextInput name="password" type="password" />
          <TextInput name="passwordConfirmation" type="password" />
          <SubmitButton disabled={isSubmitting}>Register</SubmitButton>
        </form>
      )}
    </Formik>
  );
}
