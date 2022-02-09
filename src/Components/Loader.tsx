import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '../styles';
import Logo from './Logo';

export default function Loader() {
  return (
    <LoaderWrapper role="alert" aria-label="Loading App">
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Spinner />
    </LoaderWrapper>
  );
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  flex: 1;
  background-color: ${colors.purpleDark};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  width: 170px;
  margin-bottom: 20px;
`;

const Spinner = styled.div`
  width: 25px;
  height: 25px;
  border: 3px solid transparent;
  border-bottom: 3px solid ${colors.primary};
  border-radius: 50%;

  animation: ${rotate} 0.5s linear infinite;
`;
