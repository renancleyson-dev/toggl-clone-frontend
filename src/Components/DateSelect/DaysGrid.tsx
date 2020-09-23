import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const DaysGridWrapper = styled.div``;
const DayRadio = styled.input.attrs({
  type: 'radio',
})``;

export default function DaysGrid({ timeMoment }: { timeMoment: moment.Moment }) {
  const [selectedDay, setSelectedDay] = useState<number>();
  const handleRadioOnClick = (day: number) => {
    setSelectedDay(day);
    timeMoment.date(day);
  };

  useEffect(() => {
    if (!selectedDay) {
      setSelectedDay(timeMoment.date());
    }
  }, [timeMoment, selectedDay]);

  const radios = Array.from({ length: timeMoment.daysInMonth() }, (_, index) => {
    const day = index + 1;
    return (
      <DayRadio
        data-testid="date-radio"
        type="radio"
        key={day}
        value={day}
        checked={selectedDay === day}
        onChange={() => handleRadioOnClick(day)}
      />
    );
  });

  return <DaysGridWrapper>{radios}</DaysGridWrapper>;
}
