import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import moment from 'moment';
import ManualTimer from '../../History/ManualTimer';
import { userFormat } from '../../helpers/timeFormats';
import MockedTrackContext from '../../mocks/MockedTrackContext';
import MockedUserContext from '../../mocks/MockedUserContext';

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

it('renders without crashing', (): void => {
  act(() => {
    render(
      <MockedUserContext>
        <MockedTrackContext>
          <ManualTimer />
        </MockedTrackContext>
      </MockedUserContext>,
      container
    );
  });
});

const timeRecord = {
  startTime: moment().subtract(1, 'minute'),
  endTime: moment(),
  id: 1,
};

it('adapts the end time input based on start time input', (): void => {
  act(() => {
    render(
      <MockedUserContext>
        <ManualTimer {...timeRecord} />
      </MockedUserContext>,
      container
    );
  });

  const showButton: HTMLImageElement | null = document.querySelector('[type=button]');
  act(() => {
    if (showButton) fireEvent(showButton, new MouseEvent('click', { bubbles: true }));
  });

  const startTimeInput: HTMLInputElement | null = document.querySelector(
    '[data-testid=start-time-input]'
  );
  const endTimeInput: HTMLInputElement | null = document.querySelector(
    '[data-testid=end-time-input]'
  );

  expect(startTimeInput).toHaveValue(timeRecord.startTime.format(userFormat));
  expect(endTimeInput).toHaveValue(timeRecord.endTime.format(userFormat));

  act(() => {
    if (startTimeInput)
      fireEvent.change(startTimeInput, { target: { value: '12:00:00' } });
  });

  expect(endTimeInput).toHaveValue('12:01:00');
});
