import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import moment from 'moment';
import MockedTrackContext from '../../mocks/MockedTrackContext';
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
      <MockedTrackContext>
        <HistoryItem
          startTime={timeRecord.startTime}
          endTime={timeRecord.endTime}
          recordCategory={timeRecord.category}
          id={1}
          recordLabel={timeRecord.label}
        />
      </MockedTrackContext>,
      container
    );
  });
});

it('shows a time record', (): void => {
  act(() => {
    render(
      <MockedTrackContext categories={[timeRecord.category]}>
        <HistoryItem
          startTime={timeRecord.startTime}
          endTime={timeRecord.endTime}
          recordCategory={timeRecord.category}
          recordLabel={timeRecord.label}
          id={1}
        />
      </MockedTrackContext>,
      container
    );
  });

  const timer: HTMLDivElement | null = document.querySelector(
    '[data-testid=time-record-duration]'
  );
  const category: HTMLSelectElement | null = document.querySelector(
    '[data-testid=time-record-category]'
  );
  const label: HTMLInputElement | null = document.querySelector(
    '[data-testid=time-record-label]'
  );

  expect(timer).toContainHTML('00:05');
  expect(label).toHaveValue(timeRecord.label);
  expect(category).toHaveValue(timeRecord.category);
});

it('starts a new time tracking', (): void => {});
