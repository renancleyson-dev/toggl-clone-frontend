import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import Tracker from '../../Tracker/Tracker';
import { START_BUTTON_ICON, STOP_BUTTON_ICON } from '../../helpers/constants';

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
    render(<Tracker />, container);
  });
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
  expect(buttonIcon?.alt).toBe('Stop Tracking');
  clickOnTimerButton();
  expect(buttonIcon?.src).toBe(`http://localhost${START_BUTTON_ICON}`);
  expect(buttonIcon?.alt).toBe('Start Tracking');
});
