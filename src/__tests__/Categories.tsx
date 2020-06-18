import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import MockedTrackContext from '../mocks/MockedTrackContext';
import Categories from '../Components/Categories';

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
      <MockedTrackContext>
        <Categories category={''} onChange={jest.fn()} />
      </MockedTrackContext>,
      container
    );
  });
});

const categories = ['Time Tracker', 'React', 'Rails'];

it('shows categories on a select element', (): void => {
  act(() => {
    render(
      <MockedTrackContext categories={categories}>
        <Categories category={categories[0]} onChange={jest.fn()} />
      </MockedTrackContext>,
      container
    );
  });
  const selectCategory: HTMLSelectElement | null = document.querySelector(
    '[data-testid=time-record-category]'
  );
  const options: HTMLOptionElement[] = Array.from(
    document.querySelectorAll('[data-testid=time-record-categories]')
  );
  const categoriesOnOptions = options.map((option) => option.value);

  expect(categoriesOnOptions).toStrictEqual(categories);
  expect(selectCategory).toHaveValue(categories[0]);
});
