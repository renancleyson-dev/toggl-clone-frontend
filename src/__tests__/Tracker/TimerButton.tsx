import React from 'react';
import axios from 'axios';
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
  jest.clearAllMocks();
});

jest.mock('axios');

it('renders without crashing', (): void => {
  act(() => {
    render(
      <MockedUserContext>
        <MockedTrackContext>
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
        <MockedTrackContext>
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
  expect(buttonIcon).toHaveAttribute('src', STOP_BUTTON_ICON);
  expect(buttonIcon).toHaveAttribute('alt', 'Stop Tracking');
  clickOnTimerButton();
  expect(buttonIcon).toHaveAttribute('src', START_BUTTON_ICON);
  expect(buttonIcon).toHaveAttribute('alt', 'Start Tracking');
});

it('stores a time record on backend after stop tracking', (): void => {
  act(() => {
    render(
      <MockedUserContext>
        <MockedTrackContext isTracking startTime={moment().subtract(5, 'minutes')}>
          <TimerButton />
        </MockedTrackContext>
      </MockedUserContext>,
      container
    );
  });

  const timerButton: HTMLButtonElement | null = document.querySelector(
    '[data-testid=timer-button]'
  );

  act(() => {
    if (timerButton) fireEvent(timerButton, new MouseEvent('click', { bubbles: true }));
  });

  expect(axios.post).toBeCalledTimes(1);
});
