import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { BsFillPlayFill, BsThreeDotsVertical } from 'react-icons/bs';
import { updateTimeRecord } from 'src/resources/timeRecords';
import { ITimeRecord } from 'src/types/timeRecord';
import { ITrackingTimeRecord } from 'src/types/timeRecord';
import { IProject } from 'src/types/projects';
import { ITag } from 'src/types/tags';
import formatDuration from 'src/helpers/formatDuration';
import { UserContext } from 'src/Contexts/UserContext';
import { DateGroupContext } from 'src/Contexts/DateGroupsContext';
import { EDIT_TYPE } from 'src/reducers/dateGroupsReducer/types';
import Projects from 'src/Components/Projects';
import Tags from 'src/Components/Tags';
import { TextInput } from '../Styles';
import useTracker from 'src/hooks/useTracker';

const handleInputWidth = (width: number) => (width > 400 ? 400 : width);
const editAction = (value: ITimeRecord) => ({ type: EDIT_TYPE, payload: value });

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

  & div[data-hover] {
    opacity: 0;
  }

  &:hover div[data-hover] {
    opacity: 1;
  }
`;

const NamingSection = styled.div`
  display: flex;
`;

const LabelWrapper = styled(TextInput)`
  flex: 1 1;
  min-width: ${({ value }: { value: string }) =>
    value ? `${handleInputWidth((value.length + 1) * 8)}px` : '110px'};
`;

const ProjectSelectWrapper = styled.div`
  margin-left: auto;
  font-size: 18px;
`;

const TagsWrapper = styled.div`
  margin: 0 25px 0 auto;
  font-size: 20px;
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

const PlayWrapper = styled.div`
  font-size: 29px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #a1a1a1;
`;

const MoreActionsWrapper = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #a1a1a1;
`;

const DurationDisplay = styled.div``;

const Label = ({ id, label }: { id: number; label?: string }) => {
  const [labelText, setLabelText] = useState('');
  const { user } = useContext(UserContext);
  const { dispatchDateGroups } = useContext(DateGroupContext);

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
          dispatchDateGroups && dispatchDateGroups(editAction(response.data));
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
export default function HistoryItem({
  startTime,
  endTime,
  label,
  id,
  project,
  tags,
}: Props) {
  const { user } = useContext(UserContext);
  const tracker = useTracker();
  const { dispatchDateGroups } = useContext(DateGroupContext);
  const duration = moment.duration(endTime.diff(startTime));
  const tagIds = tags?.map(({ id }) => id);
  const handleTimeRecordChange = (value: ITrackingTimeRecord) => {
    updateTimeRecord(id, value).then((response) => {
      dispatchDateGroups && dispatchDateGroups(editAction(response.data));
    });
  };
  const handleChangeOnTags = (tag: ITag) => {
    if (!tags || !tagIds) {
      handleTimeRecordChange({ userId: user.id, tagIds: tag ? [tag.id] : null });
      return;
    }
    const idIndex = tagIds.indexOf(tag.id);
    if (idIndex !== -1) {
      handleTimeRecordChange({
        userId: user.id,
        tagIds: [...tagIds.slice(0, idIndex), ...tagIds.slice(idIndex + 1)],
      });
    } else {
      handleTimeRecordChange({ userId: user.id, tagIds: [...tagIds, tag.id] });
    }
  };

  return (
    <TimeRecordWrapper>
      <NamingSection>
        <Label id={id} label={label} />
        <ProjectSelectWrapper data-hover>
          <Projects
            actualProject={project}
            handleChangeOnProject={(project: IProject | null) =>
              handleTimeRecordChange({
                userId: user.id,
                projectId: project && project.id,
              })
            }
          />
        </ProjectSelectWrapper>
      </NamingSection>
      <TagsWrapper data-hover>
        <Tags actualTags={tags} handleChangeOnTags={handleChangeOnTags} />
      </TagsWrapper>
      <EditSection>
        <EditOptions>
          <div>
            <span>{`${startTime.format('HH:mm A')} - ${endTime.format('HH:mm A')}`}</span>
          </div>
          <DurationDisplay data-testid="time-record-duration">
            {formatDuration(duration)}
          </DurationDisplay>
          <Actions>
            <PlayWrapper
              data-hover
              onClick={() => {
                if (tracker.isTracking) {
                  tracker.stopTracking();
                }
                tracker.startTracking({
                  userId: user.id,
                  label,
                  projectId: project?.id,
                  tagIds,
                });
              }}
            >
              <BsFillPlayFill />
            </PlayWrapper>
            <MoreActionsWrapper data-hover>
              <BsThreeDotsVertical />
            </MoreActionsWrapper>
          </Actions>
        </EditOptions>
      </EditSection>
    </TimeRecordWrapper>
  );
}
