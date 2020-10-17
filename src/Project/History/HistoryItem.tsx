import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { RiFolder2Fill } from 'react-icons/ri';
import { BsFillPlayFill, BsThreeDotsVertical } from 'react-icons/bs';
import { updateTimeRecord } from '../../resources/timeRecords';
import formatDuration from '../../helpers/formatDuration';
import { UserContext } from '../../Contexts/UserContext';
import Categories from '../../Components/Categories';
import { TextInput } from '../Styles';

const handleInputWidth = (width: number) => (width > 400 ? 400 : width);

const TimeRecordWrapper = styled.div`
  padding: 7px 10px 7px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
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
  recordLabel: string;
  recordCategory: string;
  id: number;
}

// UI to show a specific time record
export default function HistoryItem({
  startTime,
  endTime,
  recordLabel,
  recordCategory,
  id,
}: Props) {
  const [label, setLabel] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const { user } = useContext(UserContext);
  const duration = moment.duration(endTime.diff(startTime));
  const onChangeCategories = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    updateTimeRecord(user.id, id, { category: event.target.value });
  };

  useEffect(() => {
    setLabel(recordLabel);
    setCategory(recordCategory);
  }, [recordLabel, recordCategory]);

  return (
    <TimeRecordWrapper>
      <NamingSection>
        <Label
          data-testid="time-record-label"
          placeholder="Add description"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={() => updateTimeRecord(user.id, id, { label })}
        />
        <ProjectSelectWrapper data-hover>
          <RiFolder2Fill />
        </ProjectSelectWrapper>
      </NamingSection>
      <EditSection>
        <Categories category={category} onChange={onChangeCategories} />
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
