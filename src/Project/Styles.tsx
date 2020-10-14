import styled from 'styled-components';

export const TextInput = styled.input``;
export const SubmitButton = styled.input.attrs(() => ({
  type: 'submit',
}))``;
export const Button = styled.input.attrs(() => ({
  type: 'button',
}))``;

export const LabelInput = styled(TextInput)`
  flex: 1 1 100%;
`;
