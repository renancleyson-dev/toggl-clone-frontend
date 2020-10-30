import React from 'react';
import styled from 'styled-components';
import TrackContextProvider from '../Contexts/TrackContext';
import Tracker from './Tracker';
import History from './History';
import Sidebar from './Sidebar';

const ProjectWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  position: relative;
  flex: 1 1 100%;
  overflow: auto;
  background-color: rgb(254, 249, 248);
`;

export default () => (
  <ProjectWrapper>
    <Sidebar />
    <TrackContextProvider>
      <Content>
        <Tracker />
        <History />
      </Content>
    </TrackContextProvider>
  </ProjectWrapper>
);
