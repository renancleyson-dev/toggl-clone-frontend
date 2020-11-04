import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

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
        <MdKeyboardArrowLeft />
      </button>
      <button type="button" onClick={() => handleNextButtonOnClick()}>
        <MdKeyboardArrowRight />
      </button>
      <CurrentMonth data-testid="month">{timeMoment.format('MMM')}</CurrentMonth>
    </MonthManagerWrapper>
  );
}
