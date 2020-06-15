import React from 'react';
import moment from 'moment';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import TimerButton from '../../Tracker/TimerButton';

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
      <TimerButton
        startTime={moment()}
        isTracking
        setIsTracking={jest.fn()}
        setStartTime={jest.fn()}
      />,
      container
    );
  });
});
