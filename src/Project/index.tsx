import React from 'react';
import styled from 'styled-components';
import TrackContextProvider from '../Contexts/TrackContext';
import DateGroupsContextProvider from '../Contexts/DateGroupsContext';
import Tracker from './Tracker';
import History from './History';
import Sidebar from './Sidebar';
import ProjectsModalProvider from 'src/Contexts/ProjectsModalContext';
import TagsModalProvider from 'src/Contexts/TagsModalContext';

const Content = styled.div`
  position: relative;
  flex: 1 1 100%;
  background-color: rgb(254, 249, 248);
  overflow: auto;
`;

export default () => (
  <>
    <Sidebar />
    <TrackContextProvider>
      <DateGroupsContextProvider>
        <ProjectsModalProvider>
          <TagsModalProvider>
            <Content>
              <Tracker />
              <History />
            </Content>
          </TagsModalProvider>
        </ProjectsModalProvider>
      </DateGroupsContextProvider>
    </TrackContextProvider>
  </>
);
