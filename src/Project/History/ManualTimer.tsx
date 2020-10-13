import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { UserContext } from '../../Contexts/UserContext';
import { toMoment, userFormat } from '../../helpers/timeFormats';
import { MANUAL_TRACKER_ICON } from '../../helpers/constants';
import TimeRecordEditor from '../../Components/TimeRecordEditor';

const getDuration = (startTime: string, endTime: string) => {
  const startTimeMoment = moment(startTime, toMoment);
  const endTimeMoment = moment(endTime, toMoment);

  return moment.duration(endTimeMoment.diff(startTimeMoment));
};

const ShowButton = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <button type="button" onClick={() => setIsOpen(true)} disabled={isOpen}>
    <img src={MANUAL_TRACKER_ICON} alt="Editor" />
  </button>
);

interface Props {
  id?: number;
  startTime: moment.Moment;
  endTime: moment.Moment;
}

// UI to manage the start and end time of a record
export default function ManualTimer({ id, startTime, endTime }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [timeRecordStartTime, setTimeRecordStartTime] = useState<string>('');
  const [timeRecordEndTime, setTimeRecordEndTime] = useState<string>('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!(timeRecordStartTime && timeRecordEndTime)) {
      setTimeRecordStartTime(startTime.format(userFormat));
      setTimeRecordEndTime(endTime.format(userFormat));
    }
  }, [timeRecordStartTime, timeRecordEndTime, startTime, endTime, user, id, isOpen]);

  if (!isOpen) return <ShowButton isOpen={isOpen} setIsOpen={setIsOpen} />;
  return (
    <>
      <ShowButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <TimeRecordEditor
        id={id}
        startTime={startTime}
        endTime={endTime}
        setIsOpen={setIsOpen}
        timeRecordStartTime={timeRecordStartTime}
        timeRecordEndTime={timeRecordEndTime}
        setTimeRecordStartTime={setTimeRecordStartTime}
        setTimeRecordEndTime={setTimeRecordEndTime}
        duration={getDuration(timeRecordStartTime, timeRecordEndTime)}
      />
    </>
  );
}
