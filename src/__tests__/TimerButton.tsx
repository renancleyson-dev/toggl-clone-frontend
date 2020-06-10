import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import TimerButton from '../Tracker/TimerButton';

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

it('do a POST request on backend when click twice', (): void => {
  let startTime: moment.Moment | null = null;
  let endTime: moment.Moment | null = null;

  const POSTCallerSpy = jest.spyOn(axios, 'post');
  act(() => render(<TimerButton />, container));
  const timerButton: HTMLButtonElement | null = document.querySelector(
    '[data-testid=timer-button]'
  );

  act(() => {
    if (timerButton) {
      fireEvent(timerButton, new MouseEvent('click', { bubbles: true }));
      startTime = moment();
      jest.advanceTimersByTime(5000);
      endTime = moment();
      fireEvent(timerButton, new MouseEvent('click', { bubbles: true }));
    }
  });

  expect(POSTCallerSpy).toBeCalled();
  expect(POSTCallerSpy.mock.calls[0]).toBe(startTime);
  expect(POSTCallerSpy.mock.calls[1]).toBe(endTime);

  POSTCallerSpy.mockRestore();
});

it('changes the icon on click', (): void => {
  let isTracking = false;
  const setIsTracking = jest.fn(() => {
    isTracking = !isTracking;
  });
  const setStartTime = jest.fn();
  act(() =>
    render(
      <TimerButton
        isTracking={isTracking}
        setIsTracking={setIsTracking}
        setStartTime={setStartTime}
      />,
      container
    )
  );

  const timerButton: HTMLButtonElement | null = document.querySelector(
    '[data-testid=timer-button]'
  );
  const buttonIcon: HTMLImageElement | null = document.querySelector('[data-testid=timer-icon]');

  const clickOnTimerButton = (): void => {
    act(() => {
      if (timerButton) fireEvent(timerButton, new MouseEvent('click', { bubbles: true }));
    });
  };
  clickOnTimerButton();
  expect(buttonIcon?.src).toBe('assets/images/stopButton.svg');
  clickOnTimerButton();
  expect(buttonIcon?.src).toBe('assets/images/addButton.svg');
});
