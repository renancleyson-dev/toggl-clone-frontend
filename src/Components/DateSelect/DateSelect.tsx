import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import DaysGrid from './DaysGrid';
import MonthManager from './MonthManager';

const CurrentTimeWrapper = styled.div``;
const CurrentTime = styled.div``;
const DateSelectWrapper = styled.div``;

interface ItimeData {
  startTime: moment.Moment;
  endTime: moment.Moment;
}

export default function SelectDate({ startTime, endTime }: ItimeData) {
  const [isEditingStartTime, setIsEditingStartTime] = useState<boolean>(true);
  const handleButtonOnClick = () => {
    setIsEditingStartTime((prevState: boolean) => !prevState);
    if (isEditingStartTime) {
      setIsEditingStartTime(false);
    }
  };

  return (
    <DateSelectWrapper>
      <CurrentTimeWrapper>
        <button type="button" onClick={handleButtonOnClick}>
          {isEditingStartTime ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
        </button>
        <CurrentTime>{isEditingStartTime ? 'Start' : 'Stop'}</CurrentTime>
      </CurrentTimeWrapper>
      <MonthManager timeMoment={isEditingStartTime ? startTime : endTime} />
      <DaysGrid timeMoment={isEditingStartTime ? startTime : endTime} />
    </DateSelectWrapper>
  );
}
