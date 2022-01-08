import React from 'react';
import {
  render,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/react';
import { waitForResponse } from 'src/test-utils';
import App from '../App';
import { IDateGroup } from 'src/types/timeRecord';

afterEach(() => {
  cleanup();
});

it('renders without crashing', async () => {
  render(<App />);
  const { body } = await waitForResponse('GET', '/time_records', () =>
    waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  );

  const [dateGroup]: IDateGroup[] = body;
  const [timeRecord] = dateGroup.timeRecords;

  await waitFor(() => {
    expect(screen.getByTestId(`time-record-${timeRecord.id}`)).toBeInTheDocument();
  });
});
