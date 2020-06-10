import React from 'react';
import moment from 'moment';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Timer from '../Tracker/Timer';

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
    render(<Timer startTime={moment()} isTracking={false} />, container);
  });
});

it('manages time track by clicks', (): void => {
  const startTime = moment().subtract(1, 'hours').subtract(25, 'minutes').subtract(5, 'seconds');
  act(() => {
    render(<Timer isTracking startTime={startTime} />, container);
  });

  const timerDisplay: HTMLSpanElement | null = document.querySelector(
    '[data-testid=timer-content]'
  );

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(timerDisplay?.innerHTML).toBe('1:25:05');
});
