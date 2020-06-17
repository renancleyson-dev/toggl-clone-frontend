import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import moment from 'moment';
import MockedTrackContext from '../../mocks/MockedTrackContext';
import MockedUserContext from '../../mocks/MockedUserContext';
import { START_BUTTON_ICON, STOP_BUTTON_ICON } from '../../helpers/constants';
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
      <MockedUserContext>
        <MockedTrackContext isTracking startTime={moment()}>
          <TimerButton />
        </MockedTrackContext>
      </MockedUserContext>,
      container
    );
  });
});

it('alternates the icon on click', (): void => {
  act(() => {
    render(
      <MockedUserContext>
        <MockedTrackContext isTracking={false} startTime={moment()}>
          <TimerButton />
        </MockedTrackContext>
      </MockedUserContext>,
      container
    );
  });
  const buttonIcon: HTMLImageElement | null = document.querySelector(
    '[data-testid=timer-icon]'
  );
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
