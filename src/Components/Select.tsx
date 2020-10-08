import React from 'react';
import { useField } from 'formik';

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  name: string;
  children: React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  >[];
}

export default function Select({ name, children, ...props }: SelectProps) {
  const [field] = useField(name);

  return (
    <select {...field} {...props}>
      {children}
    </select>
  );
}
