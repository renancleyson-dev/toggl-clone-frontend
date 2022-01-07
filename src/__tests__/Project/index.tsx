import React from 'react';
import {
  within,
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  waitForResponse,
  createInput,
} from 'src/test-utils';
import Project from 'src/Project';
import { IDateGroup } from 'src/types/timeRecord';

afterEach(() => {
  cleanup();
});

describe('when tracking', () => {
  it('adds item to history after stop tracking', async () => {
    render(<Project />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
    const trackerInput = screen.getByRole('textbox', {
      name: /time record description/i,
    });

    fireEvent.change(trackerInput, createInput('time record test'));
    fireEvent.click(screen.getByRole('button', { name: /start button/i }));
    fireEvent.click(screen.getByRole('button', { name: /stop button/i }));

    const { body } = await waitForResponse('POST', '/time_records', () =>
      waitFor(() => screen.getByRole('button', { name: /start button/i }))
    );

    const timeRecord = within(await screen.findByTestId(`time-record-${body.id}`));
    expect(timeRecord.getByText(/0:00:00/i)).toBeInTheDocument();
    expect(timeRecord.getByDisplayValue(/time record test/i)).toBeInTheDocument();
  });
  it('Adds item to history on manual mode on submit', () => {});
});

describe('when start tracking by history item', () => {
  it('starts tracker bar', async () => {
    render(<Project />);
    const response = await waitForResponse('GET', '/time_records', () =>
      waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
    );

    const [dateGroup] = response.body;
    const [timeRecord] = dateGroup.timeRecords;
    const item = within(await screen.findByTestId(`time-record-${timeRecord.id}`));
    fireEvent.click(await item.findByRole('button', { name: /start time record/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /stop button/i })).toBeInTheDocument();
    });
  });
  it('auto select tags/project from history item to tracker bar', async () => {
    render(<Project />);
    const response = await waitForResponse('GET', '/time_records', () =>
      waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
    );

    const trackerBar = within(screen.getByTestId('tracker-bar'));
    const [dateGroup]: IDateGroup[] = response.body;
    const [timeRecord] = dateGroup.timeRecords;
    const item = within(await screen.findByTestId(`time-record-${timeRecord.id}`));
    fireEvent.click(await item.findByRole('button', { name: /start time record/i }));

    expect(timeRecord.label).toBeTruthy();
    expect(timeRecord.project).toBeTruthy();
    expect(trackerBar.getByText(timeRecord.project!.name)).toBeInTheDocument();
    expect(trackerBar.getByDisplayValue(timeRecord.label!)).toBeInTheDocument();
  });
});
