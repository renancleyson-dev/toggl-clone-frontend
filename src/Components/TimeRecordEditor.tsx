import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { TextInput } from '../formStyles';
import formatDuration from '../helpers/formatDuration';
import { toMoment, userFormat } from '../helpers/timeFormats';
import DateSelect from './DateSelect/DateSelect';

const EditTimeRecordWrapper = styled.div``;
const TimeInput = styled(TextInput)``;
const DurationDisplay = styled.div``;

interface Props {
  timeRecordStartTime: string;
  timeRecordEndTime: string;
  setTimeRecordStartTime: React.Dispatch<React.SetStateAction<string>>;
  setTimeRecordEndTime: React.Dispatch<React.SetStateAction<string>>;
  duration: moment.Duration;
  timeData: { startTime: moment.Moment; endTime: moment.Moment };
}

// UI to set start and end time of some time record
export default function TimeRecordEditor({
  timeRecordStartTime,
  timeRecordEndTime,
  setTimeRecordStartTime,
  setTimeRecordEndTime,
  duration,
  timeData,
}: Props) {
  const handleEndTimeAdaptation = (startTime: string) => {
    return moment(startTime, toMoment).add(duration).format(userFormat);
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
      <DurationDisplay>{formatDuration(duration)}</DurationDisplay>
      <DateSelect startTime={timeData.startTime} endTime={timeData.endTime} />
    </EditTimeRecordWrapper>
  );
}
