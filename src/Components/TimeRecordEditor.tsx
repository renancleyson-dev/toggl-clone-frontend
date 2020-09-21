import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { updateTimeRecord } from '../resources/timeRecords';
import { TextInput } from '../formStyles';
import formatDuration from '../helpers/formatDuration';
import { toMoment, userFormat } from '../helpers/timeFormats';
import DateSelect from './DateSelect/DateSelect';
import useOutsideCallback from '../hooks/useOutsideCallback';
import { UserContext } from '../Contexts/UserContext';

const EditTimeRecordWrapper = styled.div``;
const TimeInput = styled(TextInput)``;
const DurationDisplay = styled.div``;

const handleEndTimeAdaptation = (startTime: string, duration: moment.Duration) =>
  moment(startTime, toMoment).add(duration).format(userFormat);

const handleStartTimeAdaptation = (endTime: string, duration: moment.Duration) =>
  moment(endTime, toMoment).subtract(duration).format(userFormat);

const isStartTimeGreaterThanEndTime = (startTime: string, endTime: string) =>
  moment(endTime, toMoment).isBefore(moment(startTime, toMoment));

const setMomentTime = (timeMoment: moment.Moment, timeString: string) => {
  return moment(timeString, toMoment)
    .add(timeMoment.year())
    .add(timeMoment.month())
    .add(timeMoment.day());
};

interface Props {
  timeRecordStartTime: string;
  timeRecordEndTime: string;
  setTimeRecordStartTime: React.Dispatch<React.SetStateAction<string>>;
  setTimeRecordEndTime: React.Dispatch<React.SetStateAction<string>>;
  duration: moment.Duration;
  id?: number;
  startTime: moment.Moment;
  endTime: moment.Moment;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// UI to set start and end time of some time record
export default function TimeRecordEditor({
  timeRecordStartTime,
  timeRecordEndTime,
  setTimeRecordStartTime,
  setTimeRecordEndTime,
  duration,
  setIsOpen,
  id,
  startTime,
  endTime,
}: Props) {
  const { user } = useContext(UserContext);
  const editorRef = useRef(null);
  useOutsideCallback(editorRef, () => {
    if (id) {
      const newStartTime = setMomentTime(startTime, timeRecordStartTime).format();
      const newEndTime = setMomentTime(endTime, timeRecordEndTime).format();
      updateTimeRecord(user.id, id, { startTime: newStartTime, endTime: newEndTime });
    }
    setIsOpen(false);
  });
  return (
    <EditTimeRecordWrapper ref={editorRef} data-testid="time-record-editor">
      <TimeInput
        data-testid="start-time-input"
        value={timeRecordStartTime}
        onChange={(e) => {
          setTimeRecordStartTime(e.target.value);
          setTimeRecordEndTime(handleEndTimeAdaptation(e.target.value, duration));
        }}
      />
      <TimeInput
        data-testid="end-time-input"
        value={timeRecordEndTime}
        onChange={(e) => {
          setTimeRecordEndTime(e.target.value);
          if (isStartTimeGreaterThanEndTime(timeRecordStartTime, e.target.value))
            setTimeRecordStartTime(handleStartTimeAdaptation(e.target.value, duration));
        }}
      />
      <DurationDisplay>{formatDuration(duration)}</DurationDisplay>
      <DateSelect startTime={startTime} endTime={endTime} />
    </EditTimeRecordWrapper>
  );
}
