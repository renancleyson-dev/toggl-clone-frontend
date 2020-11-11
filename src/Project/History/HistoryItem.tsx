import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { RiFolder2Fill } from 'react-icons/ri';
import { BsFillPlayFill, BsThreeDotsVertical } from 'react-icons/bs';
import { updateTimeRecord } from 'src/resources/timeRecords';
import { IProject } from 'src/types/projects';
import { ITag } from 'src/types/tags';
import formatDuration from 'src/helpers/formatDuration';
import { UserContext } from 'src/Contexts/UserContext';
import { EDIT_TYPE } from 'src/reducers/dateGroupsReducer/types';
import { DateGroupContext } from 'src/Contexts/DateGroupsContext';
import { IEditedTimeRecord } from 'src/types/timeRecord';
import { TextInput } from '../Styles';

const handleInputWidth = (width: number) => (width > 400 ? 400 : width);
const editAction = (value: IEditedTimeRecord) => ({ type: EDIT_TYPE, payload: value });

const TimeRecordWrapper = styled.div`
  padding: 10px 10px 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  font-size: 14px;

  &:hover,
  &:hover * {
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
  flex: 1 1 100%;
`;

const Label = styled(TextInput)`
  flex: 1 1;
  min-width: ${({ value }: { value: string }) =>
    value ? `${handleInputWidth((value.length + 1) * 8)}px` : '110px'};
`;

const ProjectSelectWrapper = styled.div`
  flex: 1 1 100%;
  padding-left: 10px;
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
`;

const MoreActionsWrapper = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const DurationDisplay = styled.div``;

interface Props {
  startTime: moment.Moment;
  endTime: moment.Moment;
  project?: IProject;
  label?: string;
  tags?: ITag[];
  id: number;
}

// UI to show a specific time record
export default function HistoryItem({ startTime, endTime, label, id }: Props) {
  const [labelText, setLabelText] = useState('');
  const { user } = useContext(UserContext);
  const { dispatchDateGroups } = useContext(DateGroupContext);
  const duration = moment.duration(endTime.diff(startTime));

  useEffect(() => {
    if (label) {
      setLabelText(label);
    }
  }, [label]);

  return (
    <TimeRecordWrapper>
      <NamingSection>
        <Label
          data-testid="time-record-label"
          placeholder="Add description"
          value={labelText}
          onChange={(e) => setLabelText(e.target.value)}
          onBlur={() => {
            updateTimeRecord(id, { userId: user.id, label: labelText }).then(
              (response) => {
                dispatchDateGroups && dispatchDateGroups(editAction(response.data));
              }
            );
          }}
        />
        <ProjectSelectWrapper data-hover>
          <RiFolder2Fill />
        </ProjectSelectWrapper>
      </NamingSection>
      <EditSection>
        <EditOptions>
          <div>
            <span>{`${startTime.format('HH:mm A')} - ${endTime.format('HH:mm A')}`}</span>
          </div>
          <DurationDisplay data-testid="time-record-duration">
            {formatDuration(duration)}
          </DurationDisplay>
          <Actions>
            <PlayWrapper data-hover>
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
HistoryItem.defaultProps = {
  recordCategory: '',
};
