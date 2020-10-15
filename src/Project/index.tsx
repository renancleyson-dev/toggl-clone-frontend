import React from 'react';
import styled from 'styled-components';
import TrackContextProvider from '../Contexts/TrackContext';
import Tracker from './Tracker';
import History from './History';

const ProjectWrapper = styled.div`
  background-color: rgb(254, 249, 248);
`;

export default () => (
  <TrackContextProvider>
    <ProjectWrapper>
      <Tracker />
      <History />
    </ProjectWrapper>
  </TrackContextProvider>
);
