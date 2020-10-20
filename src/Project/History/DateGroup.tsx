import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { FaList } from 'react-icons/fa';
import formatDuration from '../../helpers/formatDuration';
import { colors } from '../../styles';
import HistoryItem from './HistoryItem';

interface ITimeRecord {
  duration: number;
  startTime: string;
  endTime: string;
  label: string;
  category: string;
  id: number;
}

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

const recordsMapper = ({ startTime, endTime, label, category, id }: ITimeRecord) => (
  <HistoryItem
    key={id}
    startTime={moment(startTime)}
    endTime={moment(endTime)}
    recordLabel={label}
    recordCategory={category}
    id={id}
  />
);

export default function DateGroup({ date, timeRecords }: Props) {
  const [totalDuration, setTotalDuration] = useState(moment.duration(0));
  const records = timeRecords.map(recordsMapper);

  useEffect(() => {
    const newTotalDuration = timeRecords.reduce((acc, timeRecord) => {
      const timeRecordDuration = moment.duration(timeRecord.duration, 's');

      return acc.add(timeRecordDuration);
    }, moment.duration(0));

    setTotalDuration(newTotalDuration);
  }, [timeRecords]);

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
}
