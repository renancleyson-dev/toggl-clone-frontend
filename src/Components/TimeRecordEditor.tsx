import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { TextInput } from '../formStyles';
import formatDuration from '../helpers/formatDuration';
import { toMoment, userFormat } from '../helpers/timeFormats';
import SelectDate from './SelectDate';

const EditTimeRecordWrapper = styled.div``;
const TimeInput = styled(TextInput)``;
const DurationDisplay = styled.div``;

interface Props {
  timeRecordStartTime: string | undefined;
  timeRecordEndTime: string | undefined;
  setTimeRecordStartTime: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTimeRecordEndTime: React.Dispatch<React.SetStateAction<string | undefined>>;
  duration: moment.Duration | undefined;
}

// UI to set start and end time of some time record
export default function TimeRecordEditor({
  timeRecordStartTime,
  timeRecordEndTime,
  setTimeRecordStartTime,
  setTimeRecordEndTime,
  duration,
}: Props) {
  const handleEndTimeAdaptation = (startTime: string | undefined) => {
    return startTime && moment(startTime, toMoment).add(duration).format(userFormat);
  };

  return (
    <EditTimeRecordWrapper>
      <TimeInput
        data-testid="start-time-input"
        value={timeRecordStartTime}
        onChange={(e) => {
          setTimeRecordStartTime(e.target.value);
          setTimeRecordEndTime(handleEndTimeAdaptation(e.target.value));
        }}
      />
      <TimeInput
        data-testid="end-time-input"
        value={timeRecordEndTime}
        onChange={(e) => setTimeRecordEndTime(e.target.value)}
      />
      <DurationDisplay data-testid="time-record-duration">
        {duration && formatDuration(duration)}
      </DurationDisplay>
      <SelectDate />
    </EditTimeRecordWrapper>
  );
}
