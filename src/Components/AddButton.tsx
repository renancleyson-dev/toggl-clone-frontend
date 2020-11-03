import React from 'react';
import styled from 'styled-components';
import { RiAddFill } from 'react-icons/ri';
import { colors } from '../styles';

export const AddButtonWrapper = styled.div`
  min-width: 100%;
  padding: 8px 0;
  border-top: 1px solid rgb(251, 229, 247);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const AddButtonIcon = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
  color: ${colors.primary};
  margin-right: 5px;
  cursor: pointer;
`;

const AddButtonText = styled.span`
  display: block;
  max-width: 210px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

interface Props extends React.HTMLProps<HTMLDivElement> {
  text: string;
}

export default function AddButton({ text, ...props }: Props) {
  return (
    <div {...props}>
      <AddButtonWrapper>
        <AddButtonIcon>
          <RiAddFill />
        </AddButtonIcon>
        <AddButtonText>{text}</AddButtonText>
      </AddButtonWrapper>
    </div>
  );
}
