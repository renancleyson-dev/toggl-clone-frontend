import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '../styles';
import Logo from './Logo';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
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

export default function Loader() {
  return (
    <LoaderWrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Spinner />
    </LoaderWrapper>
  );
}
