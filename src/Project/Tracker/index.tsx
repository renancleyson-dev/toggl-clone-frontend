import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { BsFillTagFill } from 'react-icons/bs';
import useTracker, { useTrackerSelector } from 'src/hooks/useTracker';
import useTags from 'src/hooks/useTags';
import useTagsOpen from 'src/hooks/useTagsOpen';
import useProjectsOpen from 'src/hooks/useProjectsOpen';
import useProjects from 'src/hooks/useProjects';
import { colors, IconWrapper, TagIcon } from 'src/styles';
import { IProject } from 'src/types/projects';
import { ITag } from 'src/types/tags';
import { TextInput } from '../Styles';
import Timer from './Timer';
import TimerButton from './TimerButton';
import MenuOptions from './MenuOptions';
import ManualMode from './ManualMode';
import ActualProject from 'src/Components/ActualProject';

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

const StyledLabelInput = styled(TextInput)`
  font-size: 16px;
  flex: 0 1 75%;

  &::placeholder {
    font-size: 18px;
  }
`;

const TrackerIconWrapper = styled(IconWrapper)`
  margin-right: 15px;
  padding: 5px;
  font-size: 20px;
`;

const LabelInput = () => {
  const { setTimeRecord } = useTracker();
  const label = useTrackerSelector(({ label }) => label);

  const handleLabelInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTimeRecord({ label: event.target.value });

  return (
    <StyledLabelInput
      aria-label="time record description"
      placeholder="What are you working on?"
      value={label}
      onChange={handleLabelInputOnChange}
    />
  );
};

const TrackerMode = () => (
  <>
    <Timer />
    <TimerButton />
  </>
);

// UI to control and inform about current time tracking
export default function Tracker() {
  const [trackerMode, setTrackerMode] = useState(true);
  const projectRef = useRef(null);
  const tagRef = useRef(null);
  const { setTimeRecord, projects, tags } = useTracker();
  const timeRecord = useTrackerSelector(({ projectId, tagIds }) => ({
    projectId,
    tagIds,
  }));

  const project = projects.find(({ id }) => id === timeRecord.projectId);
  const actualTags = tags.filter(({ id }) => timeRecord.tagIds?.includes(id));

  const handleChangeOnProject = (project: IProject | null = null) =>
    setTimeRecord({ projectId: project?.id });

  const handleChangeOntags = (tags: ITag[]) =>
    setTimeRecord({ tagIds: tags.map(({ id }) => id) });

  const { isOpen: isProjectModalOpen, openCreateModal } = useProjects(0);
  const { isOpen: isTagsModalOpen } = useTags(0);

  const openProjects = useProjectsOpen(handleChangeOnProject, projectRef, 0, project);
  const openTags = useTagsOpen(handleChangeOntags, tagRef, 0, actualTags);
  const hasTags = !!actualTags?.length;

  return (
    <TrackerBar data-testid="tracker-bar">
      <LabelInput />
      <TimerMenu>
        <TrackerIconWrapper ref={projectRef} showBox={isProjectModalOpen}>
          <ActualProject
            actualProject={project}
            handleIconClick={openProjects}
            handleAddButtonClick={openCreateModal}
          />
        </TrackerIconWrapper>
        <TrackerIconWrapper ref={tagRef} showBox={isTagsModalOpen} onClick={openTags}>
          <TagIcon hasTags={hasTags}>
            <BsFillTagFill />
          </TagIcon>
        </TrackerIconWrapper>
        {trackerMode ? <TrackerMode /> : <ManualMode />}
        <MenuOptions trackerMode={trackerMode} setTrackerMode={setTrackerMode} />
      </TimerMenu>
    </TrackerBar>
  );
}
