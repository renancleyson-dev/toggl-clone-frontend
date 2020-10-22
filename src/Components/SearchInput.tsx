import React from 'react';
import styled from 'styled-components';
import { HiOutlineSearch } from 'react-icons/hi';
import { colors } from 'src/styles';

const SearchInputWrapper = styled.div`
  position: relative;
  padding: 0 13px;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 20px;
  height: 100%;
  font-size: 17px;
  color: ${colors.primary};
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  border: 1px solid #aaa;
  color: #333;
  font-size: 14px;
  border-radius: 6px;
  width: 100%;
  padding-left: 32px;
  height: 30px;

  &:focus {
    outline: none;
    border: none;
    background-color: #f5f5f5;
  }
`;

interface Props {
  children: React.ReactNode;
}

export default function SearchInput({ children }: Props) {
  return (
    <SearchInputWrapper>
      <SearchIconWrapper>
        <HiOutlineSearch />
      </SearchIconWrapper>
      {children}
    </SearchInputWrapper>
  );
}
