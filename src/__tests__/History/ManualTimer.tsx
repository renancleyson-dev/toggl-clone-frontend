import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent, queryByTestId } from '@testing-library/react';
import moment from 'moment';
import ManualTimer from 'src/Project/History/ManualTimer';
import { userFormat } from 'src/helpers/timeFormats';
import MockedTrackContext from 'src/__mocks__/MockedTrackContext';
import MockedUserContext from 'src/__mocks__/MockedUserContext';

jest.mock('axios');

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  jest.clearAllMocks();
});

const timeRecord = {
  startTime: moment().subtract(1, 'minute'),
  endTime: moment(),
  id: 1,
};

it('renders without crashing', (): void => {
  act(() => {
    render(
      <MockedUserContext>
        <MockedTrackContext>
          <ManualTimer {...timeRecord} />
        </MockedTrackContext>
      </MockedUserContext>,
      container
    );
  });
});

it('is showed on click', (): void => {
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

  expect(queryByTestId(container, 'time-record-editor')).toBeInTheDocument();
});

it('adapts the start time input if end time is before it', (): void => {
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
  const newEndTime = timeRecord.endTime.clone().subtract(2, 'minutes');

  act(() => {
    if (endTimeInput)
      fireEvent.change(endTimeInput, {
        target: { value: newEndTime.format(userFormat) },
      });
  });
  const duration = timeRecord.endTime.diff(timeRecord.startTime);
  expect(startTimeInput).toHaveValue(newEndTime.subtract(duration).format(userFormat));
});

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

  const newStartTime = timeRecord.startTime.clone().add(5, 'minutes');
  const duration = timeRecord.endTime.diff(timeRecord.startTime);
  act(() => {
    if (startTimeInput)
      fireEvent.change(startTimeInput, {
        target: { value: newStartTime.format(userFormat) },
      });
  });

  expect(endTimeInput).toHaveValue(newStartTime.add(duration).format(userFormat));
});
