import styled from 'styled-components';
import TextInput from '../Components/TextInput';
import { colors, formContainer } from '../styles';

// BASE STYLES

export const FormBoxWrapper = styled.div`
  background-color: ${colors.backgroundMedium};
  height: 100%;
  overflow: auto;
  font-size: 18px;
  font-family: 'Inter', sans-serif;
`;

export const FormBox = styled.div`
  background-color: ${colors.backgroundDark};
  margin: 0 auto;
  height: 600px;
  width: 100%;
  max-width: 660px;
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
`;

export const Label = styled.label`
  color: ${colors.pinkLight};
`;

export const Text = styled.p`
  color: #fff;
  font-size: 18px;
`;

export const Button = styled.button`
  min-width: 100%;
  min-height: 50px;
  border-radius: 30px;
  border: 0px;
  background-color: ${colors.primary};
  color: #fff;
  font-size: 16px;
  font-family: 'Lato', sans-serif;
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
  margin-top: 25px;
`;

export const BottomText = styled(Text)`
  margin-bottom: 30px;
`;
