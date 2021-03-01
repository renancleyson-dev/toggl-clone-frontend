import React from 'react';
import styled from 'styled-components';
import { IoIosCheckmark } from 'react-icons/io';
import { colors } from 'src/styles';

const checkboxStyles = {
  display: 'none',
};

const CheckBoxWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  font-size: 25px;
  margin-right: 10px;
  color: #fff;
  border: 1px solid
    ${({ checked }: { checked?: boolean }) => (checked ? colors.primary : '#827188')};
  border-radius: 3px;
  background-color: ${({ checked }: { checked?: boolean }) =>
    checked ? colors.primary : '#fff'};
`;

const Check = styled(IoIosCheckmark)`
  position: absolute;
`;

export default function TagCheckBox({
  checked,
  ...props
}: React.HTMLProps<HTMLInputElement>) {
  return (
    <CheckBoxWrapper checked={checked}>
      <input type="checkbox" checked={checked} style={checkboxStyles} {...props} />
      <Check />
    </CheckBoxWrapper>
  );
}
