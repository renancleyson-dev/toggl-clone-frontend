import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import moment from 'moment';
import EditTimeRecord from '../../History/EditTimeRecord';
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
          <EditTimeRecord />
        </MockedTrackContext>
      </MockedUserContext>,
      container
    );
  });
});

it('edits a start time and end time of a time record', (): void => {
  const timeRecord = {
    startTime: moment().subtract(1, 'minute'),
    endTime: moment().add(1, 'second'),
    id: 1,
  };

  act(() => {
    render(
      <MockedUserContext>
        <EditTimeRecord {...timeRecord} />
      </MockedUserContext>,
      container
    );
  });

  const startTimeInput: HTMLInputElement | null = document.querySelector(
    '[data-testid=start-time-input]'
  );
  const endTimeInput: HTMLInputElement | null = document.querySelector(
    '[data-testid=end-time-input]'
  );

  expect(startTimeInput).toHaveValue(timeRecord.startTime.format('H:mm:ss'));
  expect(endTimeInput).toHaveValue(timeRecord.endTime.format('H:mm:ss'));

  act(() => {
    if (startTimeInput) startTimeInput.value = '12:00:00';
  });

  expect(endTimeInput).toHaveValue('12:00:02');
});
