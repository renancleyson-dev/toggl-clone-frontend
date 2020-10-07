import React from 'react';
import InputMask from 'react-input-mask';
import { useField } from 'formik';

interface ITextInputProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
}

export default function TextInput({ name, ...props }: ITextInputProps) {
  const [field] = useField(name);

  return <input {...field} {...props} />;
}

export const TextInputMask = (props: { mask: string }) => (
  <InputMask {...props}>
    {(InputProps: ITextInputProps) => <TextInput {...InputProps} />}
  </InputMask>
);
