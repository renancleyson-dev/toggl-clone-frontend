import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import MockedTrackContext from '../../__mocks__/MockedTrackContext';
import MockedUserContext from '../../__mocks__/MockedUserContext';
import Tracker from '../../Project/Tracker';

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
        <MockedTrackContext>
          <Tracker />
        </MockedTrackContext>
      </MockedUserContext>,
      container
    );
  });
});
