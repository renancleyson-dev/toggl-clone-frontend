import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import CheckBox from '../Components/CheckBox';
import { UserContext } from '../Contexts/UserContext';
import { requiredField } from '../helpers/validations';
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
} from './Styles';

export const TermsAndPrivacyFormRow = styled.div`
  padding: 50px 0;
  min-width: 100%;
  display: flex;
  align-items: center;
`;

export const TermsAndPrivacyLabel = styled(Label)`
  color: #fff;
  position: relative;
  display: block;
  vertical-align: middle;

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

export const TermsAndPrivacyCheckBox = styled(CheckBox)`
  display: none;
`;

interface IForm {
  username: string;
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  country: string;
}

const initialValues = {
  username: '',
  fullName: '',
  termsAndPolicy: false,
  email: '',
  password: '',
  passwordConfirmation: '',
  country: '',
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
            <Label htmlFor="country-select">Country</Label>
            <CountrySelect />
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
    <>
      <FormBox>
        <RegisterForm />
      </FormBox>
      <BottomSection>
        <BottomText>Have an account already?</BottomText>
        <Link to="/login">
          <Button type="button">Login</Button>
        </Link>
      </BottomSection>
    </>
  );
}
