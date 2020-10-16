import React from 'react';
import styled from 'styled-components';
import TrackContextProvider from '../Contexts/TrackContext';
import Tracker from './Tracker';
import History from './History';
import Sidebar from './Sidebar';

const ProjectWrapper = styled.div`
  background-color: rgb(254, 249, 248);
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  flex-basis: 100%;
  overflow: auto;
`;

export default () => (
  <TrackContextProvider>
    <ProjectWrapper>
      <Sidebar />
      <Content>
        <Tracker />
        <History />
      </Content>
    </ProjectWrapper>
  </TrackContextProvider>
);
