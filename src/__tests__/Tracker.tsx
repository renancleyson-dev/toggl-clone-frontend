import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import Tracker from '../Tracker/Tracker';

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

it('manages time track by clicks', (): void => {
  act(() => render(<Tracker />, container));
  const timerDisplay: HTMLSpanElement | null = document.querySelector(
    '[data-testid=timer-content]'
  );
  const timerButton: HTMLButtonElement | null = document.querySelector(
    '[data-testid=timer-button]'
  );

  act(() => {
    if (timerButton !== null) {
      fireEvent(timerButton, new MouseEvent('click', { bubbles: true }));
      jest.advanceTimersByTime(5000);
    }
  });

  expect(timerDisplay?.innerHTML).toBe('00:05');

  act(() => {
    if (timerButton) fireEvent(timerButton, new MouseEvent('click', { bubbles: true }));
  });

  expect(timerDisplay?.innerHTML).toBe('00:00');
});
