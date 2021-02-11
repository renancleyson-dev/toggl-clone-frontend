import styled, { css } from 'styled-components';
import TextInput from '../Components/TextInput';
import { colors } from '../styles';

export const formContainer = css`
  margin-top: 10px;
  padding-left: 15px;
  border: solid 2px #aeaeae;
  height: 50px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
`;

export const Wrapper = styled.div`
  overflow: auto;
  flex: 1;
  background-color: ${colors.backgroundMedium};
`;

export const FormBoxWrapper = styled.div`
  position: relative;
  height: 100%;
  font-size: 18px;
  font-family: 'Inter', sans-serif;
  top: -80px;
`;

export const FormBox = styled.div`
  background-color: ${colors.purpleDark};
  margin: 0 auto;
  padding: 90px 0 50px;
  width: 100%;
  max-width: 680px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const FormRow = styled.div`
  min-width: 100%;

  &:not(:first-child) {
    margin-top: 25px;
  }
`;

export const Label = styled.label`
  color: ${colors.pinkLight};
`;

export const Text = styled.p`
  color: #fff;
  font-size: 18px;
`;

export const FakeAnchor = styled.span`
  border-bottom: 1px solid ${colors.primary};

  &:hover {
    color: ${colors.primary};
  }
`;

export const Button = styled.button`
  min-width: 100%;
  min-height: 50px;
  border-radius: 30px;
  border: 0px;
  background-color: ${colors.primary};
  color: #fff;
  font-size: 16px;
  font-family: Roboto, 'sans-serif';
  cursor: pointer;

  &:hover {
    background-color: ${colors.backgroundDarkPrimary};
    color: #fff;
  }
`;

export const BottomSection = styled.div`
  margin: 70px auto;
  width: fit-content;
  text-align: center;
`;

export const FormSection = styled.div`
  min-width: 100%;
`;

export const LoginTextInput = styled(TextInput)`
  ${formContainer}

  min-width: 100%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0);

  &:focus {
    color: #000;
    background-color: ${colors.pinkLight};
  }
`;

export const SubmitButton = styled(Button)`
  margin-top: 50px;
`;

export const BottomText = styled(Text)`
  margin-bottom: 30px;
`;

export const AuthErrorMessage = styled.div`
  color: #f00;
`;
