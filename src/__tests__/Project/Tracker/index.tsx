import React from 'react';
import {
  cleanup,
  projectRender,
  fireEvent,
  screen,
  createInput,
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
    const axiosSpy = jest.spyOn(axios, 'post');
    projectRender(<Tracker />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    const trackerInput = screen.getByRole('textbox', {
      name: /time record description/i,
    });

    fireEvent.change(trackerInput, createInput('time record test'));
    fireEvent.click(screen.getByRole('button', { name: /start tracking/i }));
    fireEvent.click(screen.getByRole('button', { name: /stop tracking/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /start tracking/i })).toBeInTheDocument();
    });
    expect(trackerInput).not.toHaveValue();
    expect(axiosSpy).toHaveBeenCalled();
    axiosSpy.mockRestore();
  });
  it('ignores current time record on remove button click', async () => {
    const axiosSpy = jest.spyOn(axios, 'post');
    projectRender(<Tracker />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    const trackerInput = screen.getByRole('textbox', {
      name: /time record description/i,
    });

    fireEvent.click(screen.getByRole('button', { name: /start tracking/i }));
    fireEvent.click(screen.getByRole('button', { name: /pass current tracking/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /start tracking/i })).toBeInTheDocument();
    });
    expect(trackerInput).not.toHaveValue();
    expect(axiosSpy).not.toHaveBeenCalled();
    axiosSpy.mockRestore();
  });
});
