import React from 'react';
import {
  render,
  cleanup,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/react';
import App from '../App';

afterEach(() => {
  cleanup();
});

it('renders without crashing', async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
});
