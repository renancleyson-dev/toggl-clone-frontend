import React, { memo } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { FaList } from 'react-icons/fa';
import formatDuration from 'src/helpers/formatDuration';
import { colors } from 'src/styles';
import { ITimeRecord } from 'src/types/timeRecord';
import HistoryItem from './HistoryItem';

interface Props {
  date: string;
  timeRecords: ITimeRecord[];
}

const DateGroupWrapper = styled.div`
  margin-top: 30px;
  box-shadow: 0px 1px 3px 0px #dedede;
  background-color: #fff;

  & > * {
    padding-left: 20px;
  }
`;

const DateRow = styled.div`
  padding: 13px 20px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${colors.purpleDark};
  font-weight: 600;
`;

const Date = styled.span`
  flex: 1 1 100%;
`;

const TotalDuration = styled.span`
  padding-right: 20px;
  min-width: 100px;
`;

const MultiSelectWrapper = styled.div`
  min-width: 30px;
  height: 30px;
  border: 1px solid #aaa;
  color: #aaa;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MultiSelect = styled.div`
  flex-basis: 14px;
  height: 12px;
  font-size: 19px;
  overflow: hidden;
  display: grid;
  justify-items: center;
  align-items: center;
`;

export default memo(function DateGroup({ date, timeRecords }: Props) {
  const records = timeRecords.map(
    ({ startTime, endTime, label, tags, project, id }: ITimeRecord) => (
      <HistoryItem
        key={id}
        startTime={moment(startTime)}
        endTime={moment(endTime)}
        label={label}
        project={project}
        tags={tags}
        id={id}
      />
    )
  );

  const totalDuration = timeRecords.reduce((acc, timeRecord) => {
    const timeRecordDuration = moment.duration(timeRecord.duration, 's');
    return acc.add(timeRecordDuration);
  }, moment.duration(0));

  return (
    <DateGroupWrapper>
      <DateRow>
        <Date>{date}</Date>
        <TotalDuration>{formatDuration(totalDuration)}</TotalDuration>
        <MultiSelectWrapper>
          <MultiSelect>
            <FaList />
          </MultiSelect>
        </MultiSelectWrapper>
      </DateRow>
      {records}
    </DateGroupWrapper>
  );
});
