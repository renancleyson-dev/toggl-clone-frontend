import React from 'react';
import { useField } from 'formik';

interface CheckBoxProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
}

export default function CheckBox({ name, ...props }: CheckBoxProps) {
  const [field, , helpers] = useField(name);

  const handleChange = () => helpers.setValue(!field.value);

  return (
    <input
      type="checkbox"
      checked={field.value}
      {...field}
      {...props}
      onChange={handleChange}
    />
  );
}
