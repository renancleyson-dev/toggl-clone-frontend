import React from 'react';
import styled from 'styled-components';
import Select from '../../Components/Select';
import { colors } from '../../styles';
import { formContainer } from '../Styles';
import countries from './countries';
import SelectArrow from './SelectArrow';

const SelectContainer = styled.div`
  position: relative;
`;

const StyledSelect = styled(Select)`
  ${formContainer}

  color: #000;
  min-width: 100%;
  background-color: ${colors.pinkLight};
  appearance: none;

  &:focus {
    outline: none;
  }
`;

export default function CountrySelect() {
  return (
    <SelectContainer>
      <SelectArrow />
      <StyledSelect id="country-select" name="country">
        {countries}
      </StyledSelect>
    </SelectContainer>
  );
}
