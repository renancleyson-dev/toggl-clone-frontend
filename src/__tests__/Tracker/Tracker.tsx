import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import moment from 'moment';
import MockedTrackContext from '../../mocks/MockedTrackContext';
import MockedUserContext from '../../mocks/MockedUserContext';
import Tracker from '../../Tracker/Tracker';

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

const mockedUser = { id: 1, name: 'renan', email: 'a@gmail.com' };

it('renders without crashing', (): void => {
  act(() => {
    render(
      <MockedUserContext user={mockedUser}>
        <MockedTrackContext isTracking={false} startTime={moment()}>
          <Tracker />
        </MockedTrackContext>
      </MockedUserContext>,
      container
    );
  });
});
