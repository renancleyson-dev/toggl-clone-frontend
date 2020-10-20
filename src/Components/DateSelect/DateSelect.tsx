import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { PREVIOUS_BUTTON_ICON, NEXT_BUTTON_ICON } from '../../helpers/constants';
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
        <button type="button">
          <img
            src={isEditingStartTime ? NEXT_BUTTON_ICON : PREVIOUS_BUTTON_ICON}
            alt={isEditingStartTime ? 'Next Button' : 'Previous Button'}
            onClick={handleButtonOnClick}
          />
        </button>
        <CurrentTime>{isEditingStartTime ? 'Start' : 'Stop'}</CurrentTime>
      </CurrentTimeWrapper>
      <MonthManager timeMoment={isEditingStartTime ? startTime : endTime} />
      <DaysGrid timeMoment={isEditingStartTime ? startTime : endTime} />
    </DateSelectWrapper>
  );
}
