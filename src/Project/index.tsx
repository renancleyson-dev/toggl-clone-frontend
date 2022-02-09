import React from 'react';
import styled from 'styled-components';
import TrackContextProvider from '../Contexts/TrackContext';
import DateGroupsContextProvider from '../Contexts/DateGroupsContext';
import Tracker from './Tracker';
import History from './History';
import Sidebar from './Sidebar';
import ProjectsModalProvider from 'src/Contexts/ProjectsModalContext';
import TagsModalProvider from 'src/Contexts/TagsModalContext';
import Projects from 'src/Components/Projects';
import Tags from 'src/Components/Tags';

export default () => (
  <>
    <Sidebar />
    <DateGroupsContextProvider>
      <TrackContextProvider>
        <ProjectsModalProvider>
          <TagsModalProvider>
            <Content id="project-content">
              <Tracker />
              <History />
            </Content>
            <Projects />
            <Tags />
          </TagsModalProvider>
        </ProjectsModalProvider>
      </TrackContextProvider>
    </DateGroupsContextProvider>
  </>
);

const Content = styled.div`
  position: relative;
  flex: 1 1 100%;
  align-self: start;
  background-color: rgb(254, 249, 248);
`;
