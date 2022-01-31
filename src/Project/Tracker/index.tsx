import React, { useState } from 'react';
import styled from 'styled-components';
import { BsFillTagFill } from 'react-icons/bs';
import useTracker, { useTrackerSelector } from 'src/hooks/useTracker';
import useTags from 'src/hooks/useTags';
import useProjects from 'src/hooks/useProjects';
import { IProject } from 'src/types/projects';
import { ITag } from 'src/types/tags';
import ActualProject from 'src/Components/ActualProject';
import { colors, IconWrapper, TagIcon } from 'src/styles';
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

// UI to control and inform about current time tracking
export default function Tracker() {
  const [trackerMode, setTrackerMode] = useState(true);

  const { setTimeRecord, projects, tags } = useTracker();
  const timeRecord = useTrackerSelector(({ projectId, tagIds }) => ({
    projectId,
    tagIds,
  }));

  const project = projects.find(({ id }) => id === timeRecord.projectId);
  const actualTags = tags.filter(({ id }) => timeRecord.tagIds?.includes(id));

  const { isTagsOpen, registerTagsPosition } = useTags(0, actualTags);
  const { isProjectsOpen, openCreateModal, registerProjectsPosition } = useProjects(
    0,
    project
  );

  const hasTags = !!actualTags?.length;

  const handleChangeOnProject = (project: IProject | null = null) =>
    setTimeRecord({ projectId: project?.id });

  const handleChangeOntags = (tags: ITag[]) =>
    setTimeRecord({ tagIds: tags.map(({ id }) => id) });

  const trackerModeView = (
    <>
      <Timer />
      <TimerButton />
    </>
  );

  return (
    <TrackerBar data-testid="tracker-bar">
      <LabelInput />
      <TimerMenu>
        <TrackerIconWrapper
          {...registerProjectsPosition(handleChangeOnProject)}
          showBox={isProjectsOpen}
        >
          <ActualProject project={project} handleAddButtonClick={openCreateModal} />
        </TrackerIconWrapper>
        <TrackerIconWrapper
          {...registerTagsPosition(handleChangeOntags)}
          showBox={isTagsOpen}
        >
          <TagIcon hasTags={hasTags}>
            <BsFillTagFill />
          </TagIcon>
        </TrackerIconWrapper>
        {trackerMode ? trackerModeView : <ManualMode />}
        <MenuOptions trackerMode={trackerMode} setTrackerMode={setTrackerMode} />
      </TimerMenu>
    </TrackerBar>
  );
}
