import styled from 'styled-components';

export const TextInput = styled.input`
  border: none;
  font-family: Roboto, 'sans-serif';
`;
export const SubmitButton = styled.input.attrs(() => ({
  type: 'submit',
}))``;
export const Button = styled.input.attrs(() => ({
  type: 'button',
}))``;
