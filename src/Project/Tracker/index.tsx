import React, { useState } from 'react';
import styled from 'styled-components';
import Projects from 'src/Components/Projects';
import Tags from 'src/Components/Tags';
import useTracker from 'src/hooks/useTracker';
import { colors } from 'src/styles';
import { IProject } from 'src/types/projects';
import { ITag } from 'src/types/tags';
import { TextInput } from '../Styles';
import Timer from './Timer';
import TimerButton from './TimerButton';
import MenuOptions from './MenuOptions';
import ManualMode from './ManualMode';

const TrackerBar = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 65px;
  z-index: 100;
  display: flex;
  padding: 10px 10px 10px 20px;
  background-color: #fff;
  box-shadow: 0px 1px 8px 0px #ccc;
  color: ${colors.purpleDark};
`;

const TimerMenu = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 18px;
`;

const LabelInput = styled(TextInput)`
  font-size: 16px;
  flex: 0 1 75%;

  &::placeholder {
    font-size: 18px;
  }
`;

const TrackerMode = () => (
  <>
    <Timer />
    <TimerButton />
  </>
);

// UI to control and inform about current time tracking
export default function Tracker() {
  const [trackerMode, setTrackerMode] = useState(true);
  const { actualTimeRecord, setActualTimeRecord, projects, tags } = useTracker();
  const actualProject = projects.find(({ id }) => id === actualTimeRecord.projectId);
  const actualTags = tags.filter(({ id }) => actualTimeRecord.tagIds?.includes(id));
  const handleChangeOnProject = (project: IProject | null = null) => {
    setActualTimeRecord((prevState) => ({ ...prevState, projectId: project?.id }));
  };
  const handleChangeOntags = (tag: ITag) => {
    setActualTimeRecord((prevState) => {
      const tagIds = prevState.tagIds || [];
      const idIndex = tagIds?.indexOf(tag.id);
      if (idIndex !== -1) {
        const newTagIds = [...tagIds];
        newTagIds.splice(idIndex, 1);
        return { ...prevState, tagIds: [...newTagIds] };
      }
      return { ...prevState, tagIds: [...tagIds, tag.id] };
    });
  };

  return (
    <TrackerBar>
      <LabelInput
        placeholder="What are you working on?"
        value={actualTimeRecord.label || ''}
        onChange={(event) => {
          const { target } = event;
          setActualTimeRecord((prevState) => ({
            ...prevState,
            label: target.value,
          }));
        }}
      />
      <TimerMenu>
        <Projects
          actualProject={actualProject}
          handleChangeOnProject={handleChangeOnProject}
        />
        <Tags actualTags={actualTags} handleChangeOnTags={handleChangeOntags} />
        {trackerMode ? <TrackerMode /> : <ManualMode />}
        <MenuOptions trackerMode={trackerMode} setTrackerMode={setTrackerMode} />
      </TimerMenu>
    </TrackerBar>
  );
}
