import React from 'react';
import styled from 'styled-components';
import { RiAddFill } from 'react-icons/ri';
import { colors, buttonResets } from '../styles';

const AddButtonIcon = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
  color: ${({ disabled }: { disabled: boolean | undefined }) =>
    disabled ? '#777' : colors.primary};
  margin-right: 5px;
`;

const AddButtonText = styled.span`
  color: ${({ disabled }: { disabled: boolean | undefined }) =>
    disabled ? '#827188' : '#000'};
  display: block;
  max-width: 210px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

interface Props extends React.ComponentProps<'button'> {
  text: string;
}

const AddButton = ({ text, disabled, ...props }: Props) => (
  <button disabled={disabled} {...props}>
    <AddButtonIcon disabled={disabled}>
      <RiAddFill />
    </AddButtonIcon>
    <AddButtonText disabled={disabled}>{text}</AddButtonText>
  </button>
);

const AddButtonWrapper = styled(AddButton)`
  ${buttonResets}
  min-width: 100%;
  padding: 8px 0;
  border-top: 1px solid rgb(251, 229, 247);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled,
  &:disabled * {
    cursor: auto;
  }

  &:not(:disabled):hover {
    background-color: #f1f1f1;
  }
`;

export default AddButtonWrapper;
