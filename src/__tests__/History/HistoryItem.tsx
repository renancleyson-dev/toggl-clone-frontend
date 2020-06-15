import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import moment from 'moment';
import HistoryItem from '../../History/HistoryItem';

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

const timeRecord = {
  startTime: moment().subtract(5, 'seconds'),
  endTime: moment(),
  category: 'some category',
  label: 'Time record label',
};

it('renders without crashing', (): void => {
  act(() => {
    render(
      <HistoryItem
        startTime={timeRecord.startTime}
        endTime={timeRecord.endTime}
        category={timeRecord.category}
        label={timeRecord.label}
      />,
      container
    );
  });
});

it('shows records from a given day', (): void => {
  act(() => {
    render(
      <HistoryItem
        startTime={timeRecord.startTime}
        endTime={timeRecord.endTime}
        category={timeRecord.category}
        label={timeRecord.label}
      />,
      container
    );
  });

  const timer: HTMLDivElement | null = document.querySelector('[data-testid=time-record-duration]');
  const category: HTMLDivElement | null = document.querySelector(
    '[data-testid=time-record-category]'
  );
  const label: HTMLDivElement | null = document.querySelector('[data-testid=time-record-label]');

  expect(timer?.innerHTML).toBe('00:05');
  expect(label?.innerHTML).toBe(timeRecord.label);
  expect(category?.innerHTML).toBe(timeRecord.category);
});
