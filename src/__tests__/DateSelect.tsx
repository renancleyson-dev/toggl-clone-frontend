import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import moment from 'moment';
import MockedTrackContext from '../__mocks__/MockedTrackContext';
import MockedUserContext from '../__mocks__/MockedUserContext';
import DateSelect from '../Components/DateSelect/DateSelect';

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

const startTime = moment().subtract(2, 'days').subtract(1, 'hour');
const endTime = moment().add(1, 'day').add(1, 'hours');

it('renders without crashing', (): void => {
  act(() => {
    render(
      <MockedUserContext>
        <MockedTrackContext>
          <DateSelect startTime={startTime} endTime={endTime} />
        </MockedTrackContext>
      </MockedUserContext>,
      container
    );
  });
});

it('selects a start date on mount when a time record id is provide', (): void => {
  act(() => {
    render(
      <MockedUserContext>
        <MockedTrackContext>
          <DateSelect startTime={startTime} endTime={endTime} />
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

  expect(selectedDay).not.toBeUndefined();
  // @ts-ignore: impossible to be undefined due to the line above
  expect(parseInt(selectedDay.value)).toBe(startTime.date());
  expect(month).toHaveTextContent(startTime.format('MMM'));
});

it('shows actual month and manages selected month with buttons', (): void => {
  act(() => {
    render(
      <MockedUserContext>
        <MockedTrackContext>
          <DateSelect startTime={startTime} endTime={endTime} />
        </MockedTrackContext>
      </MockedUserContext>,
      container
    );
  });

  const initialStartTime = startTime.clone();
  const month: HTMLDivElement | null = document.querySelector('[data-testid=month]');
  const previousButton: HTMLButtonElement | null = document.querySelector(
    '[data-testid=month-previous-button]'
  );
  const nextButton: HTMLButtonElement | null = document.querySelector(
    '[data-testid=month-next-button]'
  );

  const callButtonMonth = (button: HTMLButtonElement | null) => {
    act(() => {
      if (button) fireEvent(button, new MouseEvent('click', { bubbles: true }));
    });
  };

  expect(month).toHaveTextContent(initialStartTime.format('MMM'));
  callButtonMonth(previousButton);
  expect(month).toHaveTextContent(
    initialStartTime.clone().subtract(1, 'month').format('MMM')
  );
  callButtonMonth(nextButton);
  callButtonMonth(nextButton);
  expect(month).toHaveTextContent(initialStartTime.clone().add(1, 'month').format('MMM'));
});

it('selects a start date on click', (): void => {
  act(() => {
    render(
      <MockedUserContext>
        <MockedTrackContext>
          <DateSelect startTime={startTime} endTime={endTime} />
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

  expect(dayToBeSelect?.checked).toBe(true);
});

it('let selects an end date after selecting a start date', (): void => {
  act(() => {
    render(
      <MockedUserContext>
        <MockedTrackContext>
          <DateSelect startTime={startTime} endTime={endTime} />
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
  act(() => {
    if (endDayToBeSelect) {
      fireEvent(endDayToBeSelect, new MouseEvent('click', { bubbles: true }));
    }
  });

  expect(endDayToBeSelect?.checked).toBe(true);
});
