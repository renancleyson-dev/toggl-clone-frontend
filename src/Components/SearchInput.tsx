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
