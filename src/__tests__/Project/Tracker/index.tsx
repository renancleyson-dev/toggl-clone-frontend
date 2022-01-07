import React from 'react';
import {
  cleanup,
  projectRender,
  fireEvent,
  screen,
  createInput,
  waitForResponse,
  waitFor,
  waitForElementToBeRemoved,
} from 'src/test-utils';
import Tracker from 'src/Project/Tracker';
import axios from 'src/axios';

afterEach(() => {
  cleanup();
});

it('renders without crashing', async () => {
  projectRender(<Tracker />);
});

describe('on tracker mode', () => {
  it('creates a time record when stopped', async () => {
    projectRender(<Tracker />);
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

    expect(body.label).toBe('time record test');
    expect(trackerInput).not.toHaveValue();
  });
  it('ignores current time record on remove button click', async () => {
    const axiosSpy = jest.spyOn(axios, 'post');
    projectRender(<Tracker />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    const trackerInput = screen.getByRole('textbox', {
      name: /time record description/i,
    });

    fireEvent.click(screen.getByRole('button', { name: /start button/i }));
    fireEvent.click(screen.getByRole('button', { name: /remove time record/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /start button/i })).toBeInTheDocument();
    });
    expect(axiosSpy).not.toHaveBeenCalled();
    expect(trackerInput).not.toHaveValue();
  });
});
