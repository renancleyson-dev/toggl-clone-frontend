import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import MockedTrackContext from 'src/__mocks__/MockedTrackContext';
import MockedUserContext from 'src/__mocks__/MockedUserContext';
import Tracker from 'src/Project/Tracker';

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
