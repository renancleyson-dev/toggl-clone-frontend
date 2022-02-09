import React from 'react';
import styled from 'styled-components';
import { rotate } from '../styles';

export default function ProjectLoader() {
  return (
    <ProjectLoaderWrapper role="alert" aria-label="loading time records">
      <Loader />
    </ProjectLoaderWrapper>
  );
}

const ProjectLoaderWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0);
  border-bottom: 3px solid #ccc;
  border-left: 3px solid #ccc;
  animation: ${rotate} 0.4s linear infinite;
`;
