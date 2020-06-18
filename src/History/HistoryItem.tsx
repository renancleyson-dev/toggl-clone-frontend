import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { updateTimeRecord } from '../helpers/timeRecords';
import formatDuration from '../helpers/formatDuration';
import { UserContext } from '../Contexts/UserContext';

const TimeRecordWrapper = styled.div``;
const Label = styled.input``;
const Category = styled.select``;
const DurationDisplay = styled.div``;

interface Props {
  startTime: moment.Moment;
  endTime: moment.Moment;
  label: string;
  actualCategory: string;
  categories?: string[];
  id: number;
}

// UI to show the history of a specific day
export default function HistoryItem({
  startTime,
  endTime,
  label,
  actualCategory,
  categories,
  id,
}: Props) {
  const [labelText, setLabelText] = useState<string>('');
  const [categoryText, setCategoryText] = useState<string>('');
  const { user } = useContext(UserContext);
  const duration = moment.duration(endTime.diff(startTime));
  const categoryOptions =
    categories &&
    categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ));

  useEffect(() => {
    setLabelText(label);
    setCategoryText(actualCategory);
  }, [label, actualCategory]);

  return (
    <TimeRecordWrapper>
      <Label
        data-testid="time-record-label"
        value={labelText}
        onChange={(e) => setLabelText(e.target.value)}
        onBlur={() => updateTimeRecord(user.id, id, { label: labelText })}
      />
      <Category
        data-testid="time-record-category"
        value={categoryText}
        onChange={(e) => setCategoryText(e.target.value)}
        onBlur={() => updateTimeRecord(user.id, id, { category: categoryText })}
      >
        <option value={actualCategory}>{actualCategory}</option>
        {categoryOptions}
      </Category>
      <DurationDisplay data-testid="time-record-duration">
        {formatDuration(duration)}
      </DurationDisplay>
    </TimeRecordWrapper>
  );
}
