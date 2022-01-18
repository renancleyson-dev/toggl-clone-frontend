import React, { useState, useEffect, memo } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { BsFillPlayFill, BsThreeDotsVertical, BsFillTagFill } from 'react-icons/bs';
import useUser from 'src/hooks/useUser';
import { updateTimeRecord } from 'src/resources/timeRecords';
import { ITrackingTimeRecord } from 'src/types/timeRecord';
import { IProject } from 'src/types/projects';
import { ITag } from 'src/types/tags';
import formatDuration from 'src/helpers/formatDuration';
import { dateGroupActions } from 'src/Contexts/DateGroupsContext';
import useTracker from 'src/hooks/useTracker';
import useProjects from 'src/hooks/useProjects';
import useTags from 'src/hooks/useTags';
import useDateGroups from 'src/hooks/useDateGroups';
import { buttonResets, IconWrapper, TagIcon } from 'src/styles';
import ActualProject from 'src/Components/ActualProject';
import { TextInput } from '../Styles';

const handleInputWidth = (width: number) => (width > 400 ? 400 : width);

const TimeRecordWrapper = styled.div`
  padding: 10px 10px 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  font-size: 14px;

  &:hover,
  &:hover input {
    background-color: #f9f9f9;
  }

  & div[data-hover='true'] {
    opacity: 0;
  }

  &:hover div[data-hover='true'] {
    opacity: 1;
  }
`;

const NamingSection = styled.div`
  display: flex;
`;

const LabelWrapper = styled(TextInput)`
  flex: 1 1;
  width: ${({ value }: { value: string }) =>
    value ? `${handleInputWidth((value.length + 1) * 8)}px` : '105px'};
`;

const ProjectSelectWrapper = styled.div`
  font-size: 18px;
  margin-left: 10px;
`;

const TagsWrapper = styled.div`
  font-size: 20px;
  height: 100%;
  margin: 0 35px 0 auto;
`;

const TagNamesWrapper = styled.p`
  cursor: pointer;
  font-size: 14px;
  margin: 0;
`;

const EditSection = styled.div`
  display: flex;
`;

const EditOptions = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-basis: 60px;
`;

const ActionsIconWrapper = styled.button`
  ${buttonResets}
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #a1a1a1;

  &:hover {
    color: #555;
  }
`;

const PlayWrapper = styled(ActionsIconWrapper).attrs({
  type: 'button',
})`
  font-size: 29px;
`;

const MoreActionsWrapper = styled(ActionsIconWrapper)`
  font-size: 20px;
`;

const DurationDisplay = styled.div``;

const TagNames = ({ names }: { names?: string[] }) => {
  if (!names?.length) {
    return (
      <IconWrapper>
        <TagIcon>
          <BsFillTagFill />
        </TagIcon>
      </IconWrapper>
    );
  }

  return <TagNamesWrapper>{names.join(', ')}</TagNamesWrapper>;
};

const Label = ({ id, label }: { id: number; label?: string }) => {
  const [labelText, setLabelText] = useState('');
  const { user } = useUser();
  const { dispatchDateGroups } = useDateGroups();

  useEffect(() => {
    if (label) {
      setLabelText(label);
    }
  }, [label]);

  return (
    <LabelWrapper
      data-testid="time-record-label"
      placeholder="Add description"
      value={labelText}
      onChange={(e) => setLabelText(e.target.value)}
      onBlur={() => {
        updateTimeRecord(id, { userId: user.id, label: labelText }).then((response) => {
          dispatchDateGroups(dateGroupActions.edit(response.data));
        });
      }}
    />
  );
};

interface Props {
  startTime: moment.Moment;
  endTime: moment.Moment;
  project?: IProject;
  label?: string;
  tags?: ITag[];
  id: number;
}

// UI to show a specific time record
export default memo(function HistoryItem({
  startTime,
  endTime,
  label,
  id,
  project,
  tags,
}: Props) {
  const tracker = useTracker();
  const { dispatchDateGroups } = useDateGroups();
  const { openTags, registerTagsPosition } = useTags(id);
  const {
    openProjects,
    isProjectsOpen,
    registerProjectsPosition,
    openCreateModal,
  } = useProjects(id);

  const duration = moment.duration(endTime.diff(startTime));
  const tagIds = tags?.map(({ id }) => id);
  const tagNames = tags?.map(({ name }) => name);

  const handleTimeRecordChange = (value: ITrackingTimeRecord) => {
    updateTimeRecord(id, value).then((response) => {
      dispatchDateGroups(dateGroupActions.edit(response.data));
    });
  };

  const handleChangeOnProject = (project?: IProject) =>
    handleTimeRecordChange({ projectId: project ? project.id : null });

  const handleChangeOnTags = (tags: ITag[]) => {
    const newTagIds = tags.map(({ id }) => id);
    handleTimeRecordChange({ tagIds: newTagIds });
  };

  return (
    <TimeRecordWrapper data-testid={`time-record-${id}`}>
      <NamingSection>
        <Label id={id} label={label} />
        <ProjectSelectWrapper data-hover={!project}>
          <IconWrapper
            ref={registerProjectsPosition(handleChangeOnProject)}
            showBox={isProjectsOpen}
          >
            <ActualProject
              actualProject={project}
              handleIconClick={openProjects}
              handleAddButtonClick={openCreateModal}
            />
          </IconWrapper>
        </ProjectSelectWrapper>
      </NamingSection>
      <TagsWrapper
        ref={registerTagsPosition(handleChangeOnTags)}
        data-hover={!tags?.length}
        onClick={openTags}
      >
        <TagNames names={tagNames} />
      </TagsWrapper>
      <EditSection>
        <EditOptions>
          <div>
            <span>{`${startTime.format('HH:mm A')} - ${endTime.format('HH:mm A')}`}</span>
          </div>
          <DurationDisplay>{formatDuration(duration)}</DurationDisplay>
          <Actions>
            <PlayWrapper
              aria-label="start time record"
              data-hover={true}
              onClick={() => {
                if (tracker.isTracking) {
                  tracker.stopTracking();
                }
                tracker.startTracking({
                  label,
                  projectId: project?.id,
                  tagIds,
                });
              }}
            >
              <BsFillPlayFill />
            </PlayWrapper>
            <MoreActionsWrapper data-hover={true}>
              <BsThreeDotsVertical />
            </MoreActionsWrapper>
          </Actions>
        </EditOptions>
      </EditSection>
    </TimeRecordWrapper>
  );
});
