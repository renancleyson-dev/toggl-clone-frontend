import React from 'react';
import moment from 'moment';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import mockAxios from '../../../__mocks__/axios';
import MockedTrackContext from 'src/__mocks__/MockedTrackContext';
import MockedUserContext from 'src/__mocks__/MockedUserContext';
import { START_BUTTON_ICON, STOP_BUTTON_ICON } from 'src/helpers/constants';
import TimerButton from 'src/Project/Tracker/TimerButton';

jest.useFakeTimers();

mockAxios.post.mockImplementationOnce(jest.fn());

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

  expect(mockAxios.post).toBeCalledTimes(1);
});
