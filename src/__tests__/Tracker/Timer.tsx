import React from 'react';
import moment from 'moment';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import MockedTrackContext from '../../mocks/MockedTrackContext';
import Timer from '../../Tracker/Timer';

jest.useFakeTimers();

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
      <MockedTrackContext>
        <Timer />
      </MockedTrackContext>,
      container
    );
  });
});

it('show the current Duration relative to a Moment on H:MM:SS format', (): void => {
  const startTime = moment()
    .subtract(1, 'hours')
    .subtract(25, 'minutes')
    .subtract(5, 'seconds');

  act(() => {
    render(
      <MockedTrackContext isTracking startTime={startTime}>
        <Timer />
      </MockedTrackContext>,
      container
    );
  });

  const timerDisplay: HTMLSpanElement | null = document.querySelector(
    '[data-testid=timer-content]'
  );

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(timerDisplay).toContainHTML('1:25:05');
});

it('resets duration when tracking stops', (): void => {
  const startTime = moment().subtract(1, 'hours');
  const isTracking = false;

  act(() => {
    render(
      <MockedTrackContext isTracking={isTracking} startTime={startTime}>
        <Timer />
      </MockedTrackContext>,
      container
    );
  });

  const timerDisplay: HTMLDivElement | null = document.querySelector(
    '[data-testid=timer-content]'
  );

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(timerDisplay).toContainHTML('00:00');
});
