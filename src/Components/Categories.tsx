import React from 'react';
import styled from 'styled-components';
import { BsFillTagFill } from 'react-icons/bs';

const CategoriesWrapper = styled.div`
  margin-right: 30px;
  display: inline-block;
`;

interface Props {
  category: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// UI to show and edit the categories of a time record
export default function Categories({ category, onChange }: Props) {
  return (
    <CategoriesWrapper data-hover>
      <BsFillTagFill />
    </CategoriesWrapper>
  );
}
