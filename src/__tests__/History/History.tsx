import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import History from '../../History/History';
import MockedUserContext from '../../__mocks__/MockedUserContext';

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
        <History />
      </MockedUserContext>,
      container
    );
  });
});
