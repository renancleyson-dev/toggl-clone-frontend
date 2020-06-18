import React, { useContext } from 'react';
import styled from 'styled-components';
import { TrackContext } from '../Contexts/TrackContext';

const Category = styled.select``;

interface Props {
  category: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// UI to show and edit the categories of a time record
export default function Categories({ category, onChange }: Props) {
  const { categories } = useContext(TrackContext);

  const categoryOptions =
    categories &&
    categories.map((actualCategory) => (
      <option
        key={actualCategory}
        value={actualCategory}
        data-testid="time-record-categories"
      >
        {actualCategory}
      </option>
    ));

  return (
    <Category data-testid="time-record-category" value={category} onChange={onChange}>
      {categoryOptions}
    </Category>
  );
}
