import React from 'react';
import { render } from 'react-dom';
import TimerButton from '../Tracker/TimerButton';

it('renders without crashing', (): void => {
  const div = document.createElement('div');
  render(
    <TimerButton isTracking={false} setIsTracking={jest.fn()} setStartTime={jest.fn()} />,
    div
  );
});
