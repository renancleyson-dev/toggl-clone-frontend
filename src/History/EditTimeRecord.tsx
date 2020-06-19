import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { UserContext } from '../Contexts/UserContext';
import { updateTimeRecord } from '../helpers/timeRecords';
import { toMoment, userFormat } from '../helpers/timeFormats';
import { MANUAL_TRACKER_ICON } from '../helpers/constants';
import TimeRecordEditor from '../Components/TimeRecordEditor';

interface Props {
  id?: number;
  startTime?: moment.Moment;
  endTime?: moment.Moment;
}

const getDuration = (startTime?: moment.Moment, endTime?: moment.Moment) => {
  const startTimeMoment = moment(startTime, toMoment);
  const endTimeMoment = moment(endTime, toMoment);

  return moment.duration(endTimeMoment.diff(startTimeMoment));
};

export default function ManualTracker({ id, startTime, endTime }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [timeRecordStartTime, setTimeRecordStartTime] = useState<string>();
  const [timeRecordEndTime, setTimeRecordEndTime] = useState<string>();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!(timeRecordStartTime && timeRecordEndTime)) {
      setTimeRecordStartTime(startTime?.format(userFormat));
      setTimeRecordEndTime(endTime?.format(userFormat));
    }
    if (!isOpen && id) {
      const startTime = moment(timeRecordStartTime, toMoment).format();
      const endTime = moment(timeRecordEndTime, toMoment).format();
      updateTimeRecord(user.id, id, { startTime, endTime });
    }
  }, [timeRecordStartTime, timeRecordEndTime, startTime, endTime, user, id, isOpen]);

  if (!isOpen) {
    return (
      <button type="button" onClick={() => setIsOpen((prevState: boolean) => !prevState)}>
        <img src={MANUAL_TRACKER_ICON} alt="Editor" />
      </button>
    );
  }
  return (
    <TimeRecordEditor
      timeRecordStartTime={timeRecordStartTime}
      timeRecordEndTime={timeRecordEndTime}
      setTimeRecordStartTime={setTimeRecordStartTime}
      setTimeRecordEndTime={setTimeRecordEndTime}
      duration={getDuration(startTime, endTime)}
    />
  );
}
