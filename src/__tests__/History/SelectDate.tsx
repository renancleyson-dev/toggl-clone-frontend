import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import moment from 'moment';
import MockedTrackContext from '../../mocks/MockedTrackContext';
import MockedUserContext from '../../mocks/MockedUserContext';
import SelectDate from '../../Components/SelectDate';

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
          <SelectDate />
        </MockedTrackContext>
      </MockedUserContext>,
      container
    );
  });
});

it('selects a start date on mount when a time record id is provide', (): void => {
  const startTime = moment().subtract(2, 'days').subtract(1, 'hour');
  const endTime = moment().add(1, 'day').add(1, 'hours');
  act(() => {
    render(
      <MockedUserContext>
        <MockedTrackContext>
          <SelectDate startTime={startTime} endTime={endTime} />
        </MockedTrackContext>
      </MockedUserContext>,
      container
    );
  });

  const month: HTMLDivElement | null = document.querySelector('[data-testid=month]');
  const days: HTMLInputElement[] = Array.from(
    document.querySelectorAll('[data-testid=date-radio]')
  );

  const selectedDay = days.find((date) => date.checked);
  expect(selectedDay).toHaveValue(startTime.day());
  expect(month).toContainHTML(startTime.format('MMM'));
});

it('shows actual month and manages selected month with buttons', (): void => {
  act(() => {
    render(
      <MockedUserContext>
        <MockedTrackContext>
          <SelectDate />
        </MockedTrackContext>
      </MockedUserContext>,
      container
    );
  });

  const month: HTMLDivElement | null = document.querySelector('[data-testid=month]');
  const previousMonthButton: HTMLButtonElement | null = document.querySelector(
    '[data-testid=previous-button]'
  );

  const nextMonthButton: HTMLButtonElement | null = document.querySelector(
    '[data-testid=next-button]'
  );

  const callButtonMonth = (button: HTMLButtonElement | null) => {
    act(() => {
      if (button) fireEvent(button, new MouseEvent('click', { bubbles: true }));
    });
  };
  expect(month).toContainHTML(moment().format('MMM'));
  callButtonMonth(previousMonthButton);
  expect(month).toContainHTML(moment().subtract(1, 'month').format('MMM'));
  callButtonMonth(nextMonthButton);
  expect(month).toContainHTML(moment().add(1, 'month').format('MMM'));
});

it('selects a start date on click', (): void => {
  act(() => {
    render(
      <MockedUserContext>
        <MockedTrackContext>
          <SelectDate />
        </MockedTrackContext>
      </MockedUserContext>,
      container
    );
  });

  const dayToBeSelect: HTMLInputElement | null = document.querySelector(
    'input[value="30"]'
  );
  act(() => {
    if (dayToBeSelect) {
      fireEvent(dayToBeSelect, new MouseEvent('click', { bubbles: true }));
    }
  });

  expect(dayToBeSelect).toHaveAttribute('checked', true);
});

it('selects an end date after selecting a start date', (): void => {
  act(() => {
    render(
      <MockedUserContext>
        <MockedTrackContext>
          <SelectDate />
        </MockedTrackContext>
      </MockedUserContext>,
      container
    );
  });

  const startDayToBeSelect: HTMLInputElement | null = document.querySelector(
    'input[value="29"]'
  );
  act(() => {
    if (startDayToBeSelect) {
      fireEvent(startDayToBeSelect, new MouseEvent('click', { bubbles: true }));
    }
  });
  const endDayToBeSelect: HTMLInputElement | null = document.querySelector(
    'input[value="30"]'
  );

  expect(endDayToBeSelect).toHaveAttribute('checked', true);
});
