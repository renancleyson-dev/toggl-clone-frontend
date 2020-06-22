import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { PREVIOUS_BUTTON_ICON, NEXT_BUTTON_ICON } from '../../helpers/constants';

const CurrentMonth = styled.div``;
const MonthManagerWrapper = styled.div``;

export default function MonthManager({ timeMoment }: { timeMoment: moment.Moment }) {
  const [month, setMonth] = useState<number>();
  const handlePreviousButtonOnClick = () => {
    timeMoment.subtract(1, 'month');
    setMonth(timeMoment.month());
  };
  const handleNextButtonOnClick = () => {
    timeMoment.add(1, 'month');
    setMonth(timeMoment.month());
  };

  useEffect(() => {
    if (!month) {
      setMonth(timeMoment.month());
    }
  }, [month, timeMoment]);

  return (
    <MonthManagerWrapper>
      <button type="button" onClick={() => handlePreviousButtonOnClick()}>
        <img
          data-testid="month-previous-button"
          src={PREVIOUS_BUTTON_ICON}
          alt="Previous Button"
        />
      </button>
      <button type="button" onClick={() => handleNextButtonOnClick()}>
        <img data-testid="month-next-button" src={NEXT_BUTTON_ICON} alt="Next Button" />
      </button>
      <CurrentMonth data-testid="month">{timeMoment.format('MMM')}</CurrentMonth>
    </MonthManagerWrapper>
  );
}
