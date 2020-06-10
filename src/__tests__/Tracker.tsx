import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import Tracker from '../Tracker/Tracker';
import { START_BUTTON_ICON, STOP_BUTTON_ICON } from '../Tracker/constants';

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

it('alternates the icon on click', (): void => {
  act(() => {
    render(<Tracker />, container);
  });
  const buttonIcon: HTMLImageElement | null = document.querySelector('[data-testid=timer-icon]');
  const timerButton: HTMLButtonElement | null = document.querySelector(
    '[data-testid=timer-button]'
  );

  const clickOnTimerButton = (): void => {
    act(() => {
      if (timerButton) fireEvent(timerButton, new MouseEvent('click', { bubbles: true }));
    });
  };
  clickOnTimerButton();
  expect(buttonIcon?.src).toBe(`http://localhost${STOP_BUTTON_ICON}`);
  clickOnTimerButton();
  expect(buttonIcon?.src).toBe(`http://localhost${START_BUTTON_ICON}`);
});

it('do a POST request on backend when click twice', (): void => {
  act(() => {
    render(<Tracker />, container);
  });

  const mockedStartTime: moment.Moment = moment();
  const mockedEndTime: moment.Moment = mockedStartTime.clone().add(5, 'seconds');

  const POSTCallerSpy = jest.spyOn(axios, 'post');
  const timerButton: HTMLButtonElement | null = document.querySelector(
    '[data-testid=timer-button]'
  );

  act(() => {
    if (timerButton) {
      fireEvent(timerButton, new MouseEvent('click', { bubbles: true }));
      fireEvent(timerButton, new MouseEvent('click', { bubbles: true }));
    }
  });

  expect(POSTCallerSpy).toBeCalledTimes(1);
  expect(POSTCallerSpy.mock.calls[0]).toBe(mockedStartTime);
  expect(POSTCallerSpy.mock.calls[1]).toBe(mockedEndTime);

  POSTCallerSpy.mockRestore();
});
