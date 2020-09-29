import React from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import { useField } from 'formik';

interface ITextInputProps {
  name: string;
  type?: string;
}

const StyledTextInput = styled.input``;

export default function TextInput({ name, ...props }: ITextInputProps) {
  const [field] = useField(name);

  return <StyledTextInput {...field} {...props} />;
}

export const TextInputMask = (props: { mask: string }) => (
  <InputMask {...props}>
    {(InputProps: ITextInputProps) => <TextInput {...InputProps} />}
  </InputMask>
);
