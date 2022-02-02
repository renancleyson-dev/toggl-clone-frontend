import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { updatedDiff } from 'deep-object-diff';
import { BsFillPlayFill, BsThreeDotsVertical, BsFillTagFill } from 'react-icons/bs';
import { updateTimeRecord } from 'src/resources/timeRecords';
import { IProject } from 'src/types/projects';
import { ITag } from 'src/types/tags';
import formatDuration from 'src/helpers/formatDuration';
import * as normalize from 'src/helpers/normalize';
import useTracker from 'src/hooks/useTracker';
import useProjects from 'src/hooks/useProjects';
import useTags from 'src/hooks/useTags';
import { buttonResets, colors, IconWrapper, TagIcon } from 'src/styles';
import ActualProject from 'src/Components/ActualProject';
import { TextInput } from '../Styles';

interface Props {
  startTime: moment.Moment;
  endTime: moment.Moment;
  project?: IProject;
  label?: string;
  tags?: ITag[];
  id: number;
}

const TIME_FORMAT = 'HH:mm A';

const handleInputWidth = (width: number) => (width > 400 ? 400 : width);
const hasKeys = (obj: any) => Object.keys(obj).length > 0;

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

  & *[data-hover='true'] {
    opacity: 0;
  }

  &:hover *[data-hover='true'] {
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
  width: 290px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
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

const DurationDetailed = styled.span`
  color: ${colors.purpleDark};
`;

const TagNames = ({ names, showBox }: { names?: string[]; showBox?: boolean }) => {
  if (!names?.length) {
    return (
      <IconWrapper showBox={showBox}>
        <TagIcon>
          <BsFillTagFill />
        </TagIcon>
      </IconWrapper>
    );
  }

  return <TagNamesWrapper>{names.join(', ')}</TagNamesWrapper>;
};

const Label = ({
  value,
  onChange,
  onBlur,
}: {
  value: string;
  onChange: (value: Partial<Props>) => void;
  onBlur: (value: Partial<Props>) => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ label: event.target.value });

  const handleBlur = () => onBlur({ label: value });

  return (
    <LabelWrapper
      data-testid="time-record-label"
      placeholder="Add description"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

// UI to show a specific time record
export default function HistoryItem(props: Props) {
  const { startTracking } = useTracker();
  const [timeRecord, _setTimeRecord] = useState(props);
  const timeRecordRef = useRef(timeRecord);

  const { id, label = '', startTime, endTime, tags = [], project } = timeRecord;
  const { isTagsOpen, registerTagsPosition } = useTags(id, tags);
  const { isProjectsOpen, registerProjectsPosition } = useProjects(id, project);

  useEffect(() => {
    timeRecordRef.current = timeRecord;
  }, [timeRecord]);

  const startTimeFormatted = startTime.format(TIME_FORMAT);
  const endTimeFormatted = endTime.format(TIME_FORMAT);
  const detailedDuration = `${startTimeFormatted} - ${endTimeFormatted}`;

  const duration = moment.duration(endTime.diff(startTime));
  const tagIds = tags.map(({ id }) => id);
  const tagNames = tags.map(({ name }) => name);

  const setTimeRecord = (value: Partial<Props>) =>
    _setTimeRecord((prevState) => ({ ...prevState, ...value }));

  const handleTimeRecordChange = async (value: Partial<Props>) => {
    const timeRecordDiff = updatedDiff(value, timeRecord);
    const hasChanged = hasKeys(timeRecordDiff);

    if (!hasChanged) {
      return;
    }

    try {
      setTimeRecord(value);
      await updateTimeRecord(id, normalize.timeRecord(value));
    } catch (e) {
      const valueDidUpdate = hasKeys(updatedDiff(value, timeRecordRef.current));

      if (!valueDidUpdate) {
        setTimeRecord(timeRecordDiff);
      }
    }
  };

  const handleClickOnStart = () =>
    startTracking({ label, projectId: project?.id, tagIds });

  const handleChangeOnProject = (newProject?: IProject) =>
    handleTimeRecordChange({ project: newProject });

  const handleChangeOnTags = (newTags: ITag[]) => {
    handleTimeRecordChange({ tags: newTags });
  };

  return (
    <TimeRecordWrapper data-testid={`time-record-${id}`}>
      <NamingSection>
        <Label value={label} onChange={setTimeRecord} onBlur={handleTimeRecordChange} />
        <ProjectSelectWrapper data-hover={!project && !isProjectsOpen}>
          <IconWrapper
            {...registerProjectsPosition(handleChangeOnProject)}
            showBox={isProjectsOpen}
          >
            <ActualProject project={project} />
          </IconWrapper>
        </ProjectSelectWrapper>
      </NamingSection>
      <TagsWrapper
        {...registerTagsPosition(handleChangeOnTags)}
        data-hover={!isTagsOpen && !tags.length}
      >
        <TagNames names={tagNames} showBox={isTagsOpen} />
      </TagsWrapper>
      <EditSection>
        <EditOptions>
          <div>
            <DurationDetailed>{detailedDuration}</DurationDetailed>
          </div>
          <span>{formatDuration(duration)}</span>
          <Actions>
            <PlayWrapper
              data-hover
              aria-label="start time record"
              onClick={handleClickOnStart}
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
