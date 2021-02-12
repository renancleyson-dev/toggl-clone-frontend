import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import CheckBox from '../Components/CheckBox';
import { UserContext } from '../Contexts/UserContext';
import { createUser } from '../resources/users';
import { colors } from '../styles';
import CountrySelect from './CountrySelect';
import {
  FormBox,
  Form,
  Label,
  FakeAnchor,
  BottomText,
  LoginTextInput,
  SubmitButton,
  Button,
  FormRow,
  BottomSection,
  FormSection,
  AuthErrorMessage,
} from './Styles';
import Layout from './Layout';

const TermsAndPrivacyFormRow = styled.div`
  margin: 50px 0 0;
  min-width: 100%;
  display: flex;
  align-items: center;
`;

const TermsAndPrivacyLabel = styled(Label)`
  color: #fff;
  position: relative;
  display: flex;

  &::before {
    content: '';
    display: inline-block;
    margin-right: 20px;
    background-color: rgba(0, 0, 0, 0);
    border: solid 2px #fff;
    width: 28px;
    height: 28px;
  }

  &::after {
    content: '';
    display: inline-block;
    width: 18px;
    height: 11px;
    position: absolute;
    top: 8px;
    left: 5px;
    border-bottom: 4px solid ${colors.primary};
    border-left: 4px solid ${colors.primary};
    transform: rotate(-45deg) scale(0);
    will-change: transform;
  }

  #accept-terms-checkbox:checked + &::before {
    content: '';
    color: ${colors.primary};
    background-color: ${colors.pinkLight};
  }

  #accept-terms-checkbox:checked ~ &::after {
    transform: rotate(-45deg) scale(1);
  }
`;

const TermsAndPrivacyCheckBox = styled(CheckBox)`
  display: none;
`;

interface IForm {
  termsAndPolicy: boolean;
  email: string;
  password: string;
  country: string;
}

const initialValues = {
  termsAndPolicy: false,
  email: '',
  password: '',
  country: '',
};

interface IErrors {
  [key: string]: string;
}

const validate = (fields: IForm) => {
  const errors: IErrors = {};

  Object.keys(fields)
    .filter((field) => !fields[field as keyof IForm])
    .forEach((field) => {
      errors[field] = 'Required';
    });

  return errors;
};

const RegisterForm = () => {
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (
    { email, password, country }: IForm,
    {
      setFieldError,
      setSubmitting,
    }: {
      setFieldError: (field: string, errorMsg: string) => void;
      setSubmitting: (boolState: boolean) => void;
    }
  ) => {
    try {
      const { data } = await createUser({ email, password, country });
      setUser(data);
    } catch (error) {
      if (!error.response?.data) {
        console.warn(error.message);
      } else {
        const messages: { [key: string]: string } = error.response.data;
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
    <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <Label htmlFor="country-select">Country</Label>
            <CountrySelect />
            <AuthErrorMessage>
              <ErrorMessage name="country" />
            </AuthErrorMessage>
          </FormRow>
          <TermsAndPrivacyFormRow>
            <TermsAndPrivacyCheckBox name="termsAndPolicy" id="accept-terms-checkbox" />
            <TermsAndPrivacyLabel htmlFor="accept-terms-checkbox">
              I agree to the&nbsp;<FakeAnchor>terms of service</FakeAnchor>{' '}
              &nbsp;and&nbsp;
              <FakeAnchor>privacy policy.</FakeAnchor>
            </TermsAndPrivacyLabel>
          </TermsAndPrivacyFormRow>
          <FormSection>
            <AuthErrorMessage>
              <ErrorMessage name="termsAndPolicy" />
            </AuthErrorMessage>
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
          </FormSection>
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
    <Layout>
      <FormBox>
        <RegisterForm />
      </FormBox>
      <BottomSection>
        <BottomText>Have an account already?</BottomText>
        <Link to="/login">
          <Button type="button">Login</Button>
        </Link>
      </BottomSection>
    </Layout>
  );
}
